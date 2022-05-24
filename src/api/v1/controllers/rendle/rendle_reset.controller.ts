import { Request, Response } from 'express';
import { resetRendlesGameTypes } from '../../services/rendle/rendle_reset.services'

// @desc reset all rendle contests
// @route /backend/v1/rendles/reset
// @access private
export const resetRendlesGameTypesController = async (req: Request, res: Response) => {
	try {
		if (req.body.password === "password@1234") {
			const response = await resetRendlesGameTypes()
			return res.status(200).json(response)
		}
		return res.status(200).json({ message: "Invalid Password" })
	} catch (error) {
		return res.status(200).json({ message: "Not OK" })
	}
}