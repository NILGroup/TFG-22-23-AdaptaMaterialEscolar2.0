import React, { useState } from "react";

import modalStyleVF from "./VFModal.module.css";

import { IoAddCircle } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { BiPencil, BiRectangle } from "react-icons/bi";
import { Transforms } from "slate";

import Modal from "../Modal";

export default function ModalTrueFalse({ editor, isOpen, onClose }) {
	const [lista, setLista] = useState([]);
	const [modificado, setmodificado] = useState([]);
	const [aleatorio, setaleatorio] = useState([]);
	const [ListaVistaP, setListaVistaP] = useState([]);

	const icon = "◻"; // TODO: Cambiar por un icono SVG ya que podria haber problemas de compatibilidad
	const inserjer = (editor, items, icon) => {
		const list = { type: "list", children: [] };
		const listItem = {
			type: "list-item",
			children: [
				{ text: "Responde Verdadero o Falso. Según corresponda." },
			],
		};
		list.children.push(listItem);
		items.forEach((item) => {
			const listItem = {
				type: "list-item",
				children: [{ text: icon }, { text: item }],
			};

			list.children.push(listItem);
		});
		Transforms.insertNodes(editor, list);
	};

	const submit = (e) => {
		e.preventDefault();
		if (e.target.frase.value !== "") {
			setLista([...lista, e.target.frase.value]);
			setListaVistaP([...ListaVistaP, e.target.frase.value]);
			e.target.frase.value = "";
			setmodificado([...modificado, false]);
			setaleatorio([...aleatorio, Math.random()]);
		}
	};

	return (
		<Modal title="Verdadero/Falso" isOpen={isOpen} onClose={onClose}>
			<div className={modalStyleVF.frase}>
				<form onSubmit={submit}>
					<label>Frase:</label>
					<div className={modalStyleVF.contenido}>
						<input type="text" name="frase" />

						<button type="submit" className={modalStyleVF.btn}>
							<IoAddCircle
								className={modalStyleVF.add}
								size={35}
							/>
						</button>
					</div>
				</form>

				<ul className={modalStyleVF.lisF}>
					{lista.map((elem, i) => {
						return (
							<li
								key={`concepto-${i}`}
								className={modalStyleVF.liF}
							>
								{modificado[i] === true ? (
									<input
										type="text"
										value={elem}
										onChange={(event) => {
											event.preventDefault();
											setLista(
												lista.map((elemen, k) => {
													if (i === k) {
														return event.target
															.value;
													} else {
														return elemen;
													}
												})
											);
										}}
									/>
								) : (
									elem
								)}

								<div className={modalStyleVF.imagenes}>
									<BiPencil
										style={{
											width: "21px",
											height: "21px",
										}}
										className={`${modalStyleVF.ed} ${modalStyleVF.pencil}`}
										onClick={(event) => {
											event.preventDefault();
											setmodificado(
												modificado.map((elemen, k) => {
													if (i === k) {
														return !elemen;
													} else {
														return false;
													}
												})
											);
											setListaVistaP(lista);
										}}
									/>

									<FiTrash2
										style={{
											width: "21px",
											height: "21px",
										}}
										className={modalStyleVF.ed}
										onClick={(event) => {
											event.preventDefault();
											setLista(
												lista.filter((element, j) => {
													return i !== j;
												})
											);
											setListaVistaP(
												lista.filter((element, j) => {
													return i !== j;
												})
											);
										}}
									/>
								</div>
							</li>
						);
					})}
				</ul>

				<hr />
				<div className={modalStyleVF.vistaP}>
					<div className={modalStyleVF.vistaPCab}>
						<p>Vista Previa </p>
						<button
							className={modalStyleVF.btnReor}
							onClick={(event) => {
								event.preventDefault();

								setaleatorio(
									aleatorio.map((elem) => {
										return Math.random();
									})
								);

								let nuevaLista, listaOrdenada, listaFinal;
								nuevaLista = ListaVistaP.map((lis, i) => ({
									lis,
									random: aleatorio[i],
								}));

								listaOrdenada = nuevaLista.sort(
									(a, b) => a.random - b.random
								);

								listaFinal = listaOrdenada.map(
									(item) => item.lis
								);

								setListaVistaP(listaFinal);
							}}
						>
							Reordenar
						</button>
					</div>
					<div className={modalStyleVF.ulD}>
						{lista.length > 0 && (
							<p className={modalStyleVF.enunciado}>
								Responde Verdadero o Falso. Según corresponda.
							</p>
						)}
						<ul className={modalStyleVF.uldina}>
							{ListaVistaP.map((elem, i) => {
								return (
									<li
										key={`concepto-${i}`}
										className={modalStyleVF.liD}
									>
										<BiRectangle
											className={modalStyleVF.rect}
										/>
										<p>{elem}</p>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className={modalStyleVF.botonDiv}>
					<button
						className={modalStyleVF.btnReor}
						onClick={(event) => {
							event.preventDefault();
							event.preventDefault();
							inserjer(editor, ListaVistaP, icon);
							setLista([]);
							setListaVistaP([]);
							setaleatorio([]);
							setmodificado([]);
						}}
					>
						OK
					</button>
				</div>
			</div>
		</Modal>
	);
}
