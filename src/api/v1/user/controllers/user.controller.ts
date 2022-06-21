import { Request, Response } from 'express';
import { UserServices } from '../services/user.service'
import { EmailSender } from '../../utils/email'
import { HttpResponseFactory } from '../../http/http_factory';
import { JWT } from '../../utils/jwt';

export class UserController {

	static createUser = async (req: Request, res: Response) => {
		try {
			const { username, email, password } = req.body;
			const isExists = await UserServices.isUserAlreadyExists(username, email)
			if (isExists) {
				const response = {
					errorType: "USER_ALREADY_EXIST", message: "username or email already in use",
					error: true,
				}
				return HttpResponseFactory.OK({ data: { ...response }, res: res })
			}
			const token: string = UserServices.createToken();
			const hash = await UserServices.hashPassword(password)
			const newUser = await UserServices.createUser(username, email, hash, token, false);
			await UserServices.createWalletForUser(newUser?._id)
			const html: string = EmailSender.getEmailVerificationHTML(token);
			console.log("sending verification email to - " + email)
			await EmailSender.sendMail("contact@renderverse.io", email, "Welcome to Renderplay, Please Verify Your Email", "", html.toString());
			console.log("sent verification email")
			const response = { message: "Successfully created", errorType: "NONE", error: false };
			return HttpResponseFactory.OK({ data: { ...response }, res: res })
		} catch (err) {
			return HttpResponseFactory.INTERNAL_SERVER_ERROR({ data: { message: err }, res: res })
		}

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
		try {
			const user = await UserServices.authenticateUser(username)
			const authorized = await UserServices.verifyPassword(password, user?.password)

			if (!authorized) {
				const response = {
					message: "invalid username or password", errorType: "INVALID_CRENDENTAILS",
					error: true
				}
				return HttpResponseFactory.OK({ data: { ...response }, res: res })
			}

			if (!user?.isVerified) {
				const response = {
					error: true, message: "verify email, to login", errorType: "UNAUTHORIZED_EMAIL",
					status: 401
				}
				return HttpResponseFactory.OK({ data: { ...response }, res: res })
			}

			const token: string = JWT.generateJWTToken(user?._id);
			const response = {
				error: false, message: "SUCCESS", accessToken: token, errorType: 'NONE',
			}
			return HttpResponseFactory.OK({ data: { ...response }, res: res })
		} catch (err: any) {
			const response = {
				errorType: "INVALID_CREDENTIALS", message: "Username/Email does not exists",
				error: true
			}
			return response;
		}
	};

	static forgotPasswordSendRequest = async (req: Request, res: Response) => {
		const { email } = req.body;
		const token = await UserServices.setToken(email)
		const html: string = EmailSender.getForgotPasswordHTML(token);
		console.log("sending forgot password email to - " + email)
		await EmailSender.sendMail("contact@renderverse.io", email, "Password Change", "", html.toString());
		console.log("sent forgot password email")
		return HttpResponseFactory.CREATED({ data: { isEmailSend: true }, res: res })
	};

	static validateToken = async (req: Request, res: Response) => {
		const { token } = req.params;
		const isVerified = await UserServices.isValidToken(token)
		await UserServices.setIsVerified(token, isVerified);
		return HttpResponseFactory.OK({ data: { isVerified: isVerified }, res: res })
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
