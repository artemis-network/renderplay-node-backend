import { NextFunction, Request, Response } from "express";
import { decodeJWTToken } from "../utils/jwt";
import { logger } from "../utils/logger";
import { db } from '../db';

const { User } = db

const authorizeUserMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
	try {
		logger.info(">> getting authorization header >>");
		logger.info(">> someting went wrong");
		const token = req.headers['authorization']?.toString();
		logger.info(">> decoding token " + token + " >> ");
		const decoded = decodeJWTToken(token || "");
		const user = await User.findOne({ username: decoded.session })
		const isExpired = decoded.expires < new Date()
		if ((user !== null || user !== undefined) && !isExpired)
			return next();
		return res.status(403).json({ messsage: "Invalid jwt token" })
	} catch (e) {
		console.log(e)
		return res.status(403).json({ messsage: "Invalid jwt token" })
	}
}

export { authorizeUserMiddleWare }
