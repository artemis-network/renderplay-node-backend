import { Request, Response } from 'express';
import { createUser, loginUser, googleLogin, googleMobileLogin } from '../services/user.service'

export const createUserController = async (req: Request, res: Response) => {
	const { username, email, password, } = req.body;
	const result = await createUser(username, email, password);
	return res.status(200).json(result)

};

export const createGoogleUserController = async (req: Request, res: Response) => {
	const { token } = req.body;
	const result = await googleLogin(token)
	return res.status(200).json(result)
}

export const createMobileGoogleUserController = async (req: Request, res: Response) => {
	const { email, client } = req.body;
	if (client === "client0123") {
		const result = await googleMobileLogin(email)
		return res.status(200).json(result)
	}
	return res.status(200).json({ message: "invalid client id" })
}

export const loginUserController = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const result = await loginUser(username, password)
	return res.status(200).json(result)
};
