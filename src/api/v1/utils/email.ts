import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../../../config'

import { verificationHtml, forgotPasswordHtml } from './verification_htmls';

export class EmailSender {

	static getTransporter() {
		return nodemailer.createTransport({
			host: EMAIL_CONFIG.host,
			port: Number(EMAIL_CONFIG.port),
			secure: false,
			requireTLS: true,
			tls: {
				ciphers: 'SSLv3'
			},
			auth: {
				user: EMAIL_CONFIG.username,
				pass: EMAIL_CONFIG.password,
			},
		});
	}

	static async sendMail(from: string, to: string, subject: string, text: string, html: string) {
		return await this.getTransporter().sendMail({
			from: EMAIL_CONFIG.email, // sender address
			to: to, // list of receivers
			subject: subject, // Subject line
			text: text, // plain text body
			html: html, // html body
		});
	}

	static getEmailVerificationHTML(token: string): string {
		const url: string = `https://play.renderverse.io/verify/${token}`
		return verificationHtml(url);
	}

	static getForgotPasswordHTML(token: string): string {
		const url: string = `https://play.renderverse.io/change-password/${token}`
		return forgotPasswordHtml(url);
	}
}