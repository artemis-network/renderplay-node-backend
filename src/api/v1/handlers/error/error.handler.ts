export enum ErrorType {
	ObjectNotFound,
	NetworkFailure,
	DatabaseDisconnected
}

export class ErrorHandler {

	errorType: ErrorType;
	message: string

	constructor(errorType: ErrorType, message: string) {
		this.errorType = errorType;
		this.message = message
	}

	static objectNotFound(message: string) {
		return new ErrorHandler(ErrorType.ObjectNotFound, message);
	}

	static networkFailure(message: string) {
		return new ErrorHandler(ErrorType.NetworkFailure, message);
	}

	static databaseDisconnected(message: string) {
		return new ErrorHandler(ErrorType.DatabaseDisconnected, message);
	}
}
