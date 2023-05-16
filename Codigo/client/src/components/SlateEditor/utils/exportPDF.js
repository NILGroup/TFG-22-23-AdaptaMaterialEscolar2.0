export default async function exportPDF() {
	const divContents = document.getElementById("editable").innerHTML;
	let a = window.open("", "", "height=1123, width=794");

	let head = document.getElementsByTagName("head")[0].innerHTML;
	console.log(head);
	a.document.write("<html>");
	a.document.write(head);
	a.document.write("<body >");
	a.document.write(divContents);
	a.document.write("</body></html>");
	a.document.close();
	a.print();
}
