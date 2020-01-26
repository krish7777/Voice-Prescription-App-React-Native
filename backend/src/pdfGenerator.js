"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

//let PDFpath = ""


const testAccount = {
	user: "cs18b021@iittp.ac.in",
	pass: "Sameed@2000"
}

const createPDF = async function(data) {

	let symptomsHtml = "<ul>"
	let symptoms = data.symptoms
	symptoms.forEach(sym => {
		symptomsHtml += "<li>" + sym + "</li>"
	})
	symptomsHtml += "</ul>"

	data.symptoms = symptomsHtml

	let diagnosisHtml = "<ul>"
	let diagnosis = data.diagnosis
	diagnosis.forEach(sym => {
		diagnosisHtml += "<li>" + sym + "</li>"
	})
	diagnosisHtml += "</ul>"

	data.diagnosis = diagnosisHtml

	let adviceHtml = "<ul>"
	let advice = data.advice
	advice.forEach(adv => {
		adviceHtml += "<li>" + adv + "</li>"
	})
	adviceHtml += "</ul>"

	data.advice = adviceHtml

	let prescription = data.prescription

	let presString = "<table><tr><th>Name</th><th>Dosage</th></tr>"

	prescription.forEach((med) => {
		presString += "<tr><td>" + med.name + "</td><td>" + med.Dosage + "</td></tr>"

	})
	presString += "</table>"
	data.prescription = presString




	var templateHtml = fs.readFileSync(path.join(process.cwd(), 'template.html'), 'utf8');
	var template = handlebars.compile(templateHtml);
	var html = template(data);

	var milis = new Date();
	milis = milis.getTime();

	var pdfPath = path.join('pdf', `${data.name}-${milis}.pdf`);
	//PDFpath = pdfPath

	console.log(pdfPath)
	var options = {
		width: '1230px',
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "10px",
			bottom: "30px"
		},
		printBackground: true,
		path: pdfPath
	}

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	});

	var page = await browser.newPage();

	await page.goto(`data:text/html;charset=UTF-8,${html}`, {
		waitUntil: 'networkidle0'
	});

	await page.pdf(options);
	await browser.close();

	main(pdfPath, data)



}

// const now = new Date();

// let currentdate = "" + now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
// console.log(currentdate)

// const data = {
// 	title: "Medical Report",
// 	doctor: "Dr. Deep Maheshwari",
// 	hospital: "Apollo Hospital",
// 	doctorNumber: "6302734859",
// 	date: currentdate,
// 	name: "Tapish",
// 	age: 19,
// 	sex: "male",
// 	symptoms: ["Dry Cough for last 3 days ", "fever ", "Running Nose"],
// 	diagnosis: ["Acute Bronchitis"],
// 	prescription: [{ name: "Paracetamol 500 mg", Dosage: "once a day for 3 days" },
// 	{ name: "Dolo 650 mg",  Dosage: "once a day for 3 days" }
// 	],
// 	advice: ["Drink Warm Water ", "Dont eat grapes"]
// }

// createPDF(data);



// async..await is not allowed in global scope, must use a wrapper
async function main(path, data) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass // generated ethereal password
		},

	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Medical Report" <hack-404sih@gmail.com>', // sender address
		to: "'sameed'<meersameed@gmail.com>,'Nikhil<cs18b041@iittp.ac.in>", // list of receivers
		subject: "Medical report", // Subject line
		text: "Here is the presciption report", // plain text body
		html: "<b>From: " + data.doctor + "</b>", // html body
		attachments: [
			{
				filename: "MedicalReport.pdf",
				path: path

			}
		]
	});

	// console.log("Message sent: %s", info.messageId);
	// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// // Preview only available when sending through an Ethereal account
	// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

module.exports = { createPDF }

//main().catch(console.error);

