import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../../../config'

class EmailSender {

	// private getTransporter() {
	// 	return nodemailer.createTransport({
	// 		host: EMAIL_CONFIG.host,
	// 		port: Number(EMAIL_CONFIG.port),
	// 		secure: false,
	// 		debug: true,
	// 		logger: true,
	// 		tls: {
	// 			ciphers: 'SSLv3'
	// 		},
	// 		auth: {
	// 			user: EMAIL_CONFIG.username,
	// 			pass: EMAIL_CONFIG.password,
	// 		},
	// 	});
	// }

	async sendEmailVerificationEmail(from: string, to: string, subject: string, text: string, html: string) {
		// return await this.getTransporter().sendMail({
		// 	from: from, // sender address
		// 	to: to, // list of receivers
		// 	subject: subject, // Subject line
		// 	text: text, // plain text body
		// 	html: html, // html body
		// });
	}

}

function getEmailVerificationHTML(token: string): string {
	return `<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><a href="${token}">Confirm Email</a></body></html>'.`
}

export { getEmailVerificationHTML, EmailSender }