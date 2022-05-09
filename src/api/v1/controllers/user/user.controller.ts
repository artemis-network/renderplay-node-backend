import { Request, Response } from 'express';
import { createUser, loginUser, googleLogin } from '../../services/user/user.service'

const createUserController = async (req: Request, res: Response) => {
	try {
		const { username, email, password, } = req.body;
		const result = await createUser(username, email, password);
		return res.status(200).json(result)
	} catch (e) {
		return res.status(200).json(e);
	}
};

const createGoogleUserController = async (req: Request, res: Response) => {
	try {
		const { username, email } = req.body;
		const result = await googleLogin(username, email)
		return res.status(200).json(result)
	} catch (e) {
		return res.status(200).json(e);
	}
}

const loginUserController = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const result = await loginUser(username, password)
		return res.status(200).json(result)
	} catch (e) {
		return res.status(200).json(e);
	}
};

export { createUserController, createGoogleUserController, loginUserController };