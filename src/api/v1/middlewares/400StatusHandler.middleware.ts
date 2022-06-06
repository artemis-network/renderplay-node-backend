import { NextFunction, Request, Response } from "express";

export enum ErrorType {
	BadRequest,
	ObjectNotFound,
	UnAuthorizedRequest,
}

export class Error {
	errorType: ErrorType;
	message: string;
	status: number;

	constructor(errorType: ErrorType, message: string, status: number) {
		this.errorType = errorType;
		this.message = message;
		this.status = status;
	}
}

export class Status400Factory {
	static badRequest(message: string) {
		return new Error(ErrorType.ObjectNotFound, message, 400);
	}

	static unAuthorizedRequest(message: string) {
		return new Error(ErrorType.UnAuthorizedRequest, message, 403);
	}

	static objectNotFound(message: string) {
		return new Error(ErrorType.ObjectNotFound, message, 404);
	}
}

export const status400MiddleWare = async (
	req: Request,
	res: Response,
	next: NextFunction,
	sanitize: Error
) => {
	if (sanitize.errorType === ErrorType.BadRequest) {

	}
};
