"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSender = exports.getEmailVerificationHTML = void 0;
class EmailSender {
    getTransporter() {
        // return nodemailer.createTransport({
        // 	host: "smtp.office365.com",
        // 	port: 25,
        // 	secure: false,
        // 	debug: true,
        // 	logger: true,
        // 	tls: {
        // 		ciphers: 'SSLv3'
        // 	},
        // 	auth: {
        // 		user: 'contact@renderverse.io',
        // 		pass: 'Artemis@123',
        // 	},
        // });
    }
    sendEmailVerificationEmail(from, to, subject, text, html) {
        return __awaiter(this, void 0, void 0, function* () {
            // return await this.getTransporter().sendMail({
            // 	from: from, // sender address
            // 	to: to, // list of receivers
            // 	subject: subject, // Subject line
            // 	text: text, // plain text body
            // 	html: html, // html body
            // });
        });
    }
}
exports.EmailSender = EmailSender;
function getEmailVerificationHTML(token) {
    return `<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><a href="${token}">Confirm Email</a></body></html>'.`;
}
exports.getEmailVerificationHTML = getEmailVerificationHTML;
