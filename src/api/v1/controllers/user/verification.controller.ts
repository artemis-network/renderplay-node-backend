import { Request, Response } from 'express';
import { checkForAccountActivation, verifyUserEmail } from '../../services/user/verification.service';

const checkForAccountActivationController = async (req: Request, res: Response) => {
	try {
		const { username, code } = req.body;
		const result = await checkForAccountActivation(username, code);
		res.status(200).json(result)
	} catch (e) {
		res.status(200).json(e)
	}
}


const verifyUserEmailController = async (req: Request, res: Response) => {
	try {
		const { username, token } = req.body;
		const result = await verifyUserEmail(username, token);
		res.status(200).json(result);
	} catch (e) {
		res.status(200).json(e);
	}
}

export {
	checkForAccountActivationController,
	verifyUserEmailController
}