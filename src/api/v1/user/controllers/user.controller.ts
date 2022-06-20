import { Request, Response } from 'express';
import { UserServices } from '../services/user.service'
import { EmailSender } from '../../utils/email'
import { HttpResponseFactory } from '../../http/http_factory';
import { createToken } from '../../utils/token';

export class UserController {

	static createUser = async (req: Request, res: Response) => {
		const { username, email, password } = req.body;
		const result = await UserServices.createUser(username, email, password, false);
		return res.status(200).json(result)

	};
	static createGoogleUser = async (req: Request, res: Response) => {
		const { token } = req.body;
		const result = await UserServices.googleLogin(token)
		return res.status(200).json(result)
	}

	static createMobileGoogleUser = async (req: Request, res: Response) => {
		const { email, client } = req.body;
		if (client === "client0123") {
			const result = await UserServices.googleMobileLogin(email)
			return res.status(200).json(result)
		}
		return res.status(200).json({ message: "invalid client id" })
	}

	static loginUser = async (req: Request, res: Response) => {
		const { username, password } = req.body;
		const result = await UserServices.loginUser(username, password)
		return res.status(200).json(result)
	};

	static forgotPasswordSendRequest = async (req: Request, res: Response) => {
		const { email } = req.body;
		const token = await UserServices.setToken(email)
		const html: string = EmailSender.getForgotPasswordHTML(token);
		await EmailSender.sendMail("contact@renderverse.io", email, "Password Change", "", html.toString());
		return HttpResponseFactory.CREATED({
			data: { isEmailSend: true },
			res: res
		})
	};

	static validateToken = async (req: Request, res: Response) => {
		const { token } = req.params;
		const isVerified = await UserServices.isValidToken(token)
		await UserServices.setIsVerified(token,isVerified);
		return HttpResponseFactory.OK({
			data: { isVerified: isVerified },
			res: res
		})
	}

	static changePassword = async (req: Request, res: Response) => {
		const { token } = req.params;
		const { password } = req.body
		const isVerified = await UserServices.isValidToken(token)
		if (isVerified) {
			const hash = await UserServices.hashPassword(password)
			await UserServices.setPassword(token, hash)
			await UserServices.updateToken(token)
			return HttpResponseFactory.OK({ data: { isPasswordChanged: true }, res: res })
		}
		return HttpResponseFactory.OK({ data: { isPasswordChanged: false }, res: res })
	}

}
