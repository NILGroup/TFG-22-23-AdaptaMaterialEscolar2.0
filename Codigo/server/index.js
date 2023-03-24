"use strict";

const path = require("path");

const express = require("express");
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

app.post(
	"/openai_api",
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
				messages: [
					{
						role: "user",
						content: `Resume este texto en aproximadamente ${summaryLength} palabras: ${originalText}`,
					},
				],
			});

			return response.status(200).json({ summary: apiResponse.data.choices[0].message.content });
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
