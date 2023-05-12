"use strict";

const path = require("path");

const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");

const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const openAIConfiguration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAIConfiguration);

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());
app.use(cors());

app.post("/api/searchPictogram", body("searchParam").notEmpty().trim(), async (request, response) => {
	const errors = validationResult(request);

	if (!errors.isEmpty()) {
		console.error(errors.array());

		return response.status(400).end();
	}

	const searchParam = request.body.searchParam;

	try {
		const apiResponse = await fetch(`https://api.arasaac.org/api/pictograms/es/search/${searchParam}`);
		const data = await apiResponse.json();

		let pictograms = [];
		for (let i = 0; i < data.length && i < 20; i++) {
			pictograms.push(`https://static.arasaac.org/pictograms/${data[i]._id}/${data[i]._id}_500.png`);
		}

		response.status(200).json(pictograms);
	} catch (error) {
		console.error(error.message);

		response.status(500).end();
	}
});

app.post("/api/pictotranslator", body("originalText").notEmpty().trim(), async (request, response) => {
	const errors = validationResult(request);

	if (!errors.isEmpty()) {
		console.error(errors.array());

		return response.status(400).end();
	}

	const originalText = request.body.originalText;

	const sanitizedText = originalText.replace(/([\n\r\s\t.,/#!$%^&*;:{}=\-_`~()´?¿!¡'"])/g, " ");
	const words = originalText.split(/([\n\r\s\t.,/#!$%^&*;:{}=\-_`~()´?¿!¡'"])/g);

	try {
		const apiResponse = await fetch(`http://hypatia.fdi.ucm.es:5223/PICTAR/traducir/${sanitizedText}`);

		const data = await apiResponse.json();
		const pictogramsMap = {};

		for (const pictogramData of data) {
			if (/Word not found:/.test(pictogramData)) continue;

			// Obtener la palabra
			let word = pictogramData.split(" ");
			word = word[word.length - 1];

			// Quedarnos solo con los IDs de los pictogramas, ademas de asegurarnos que no hay duplicados
			let pictograms = /\[[\d, ]+\]/.exec(pictogramData)[0];
			pictograms = pictograms
				.slice(1, pictograms.length - 1)
				.split(", ")
				.filter((value, index, array) => array.indexOf(value) === index);

			// Convertir los IDs en URLs a los pictogramas de ARASAAC
			pictograms = pictograms.map((id) => `https://static.arasaac.org/pictograms/${id}/${id}_500.png`);

			pictogramsMap[word] = pictograms;
		}

		let pictos = [];

		for (const word of words) {
			if (/([\n\r\s\t.,/#!$%^&*;:{}=\-_`~()´?¿!¡'"])/g.test(word)) {
				pictos.push({
					word,
					currentPicto: 0,
					disabled: false,
					pictograms: [],
				});
			} else {
				pictos.push({
					word,
					currentPicto: 0,
					disabled: false,
					pictograms: pictogramsMap[word.toLowerCase()] ?? [],
				});
			}
		}

		response.status(200).json(pictos);
	} catch (error) {
		console.error(error.message);

		response.status(500).end();
	}

	response.end();
});

app.post(
	"/api/summary",
	body("originalText").notEmpty().trim(),
	body("summaryLength").notEmpty().toInt(),
	async (request, response) => {
		const errors = validationResult(request);

		if (!errors.isEmpty()) {
			console.error(errors.array());

			return response.status(400).end();
		}

		const originalText = request.body.originalText;
		const summaryLength = request.body.summaryLength;

		try {
			const apiResponse = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				temperature: 0.8,
				messages: [
					{
						role: "user",
						content: `Resume este texto en aproximadamente ${summaryLength} palabras, si no se puede resumir el texto devuelve -1: ${originalText}`,
					},
				],
			});

			response.status(200).json(apiResponse.data.choices[0].message.content);
		} catch (error) {
			console.error(error.message);

			response.status(500).end();
		}
	}
);

app.get("*", (request, response) => {
	response.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, (error) => {
	if (error) console.log(error.message);
	else console.log(`Server is running on port ${PORT}!`);
});
