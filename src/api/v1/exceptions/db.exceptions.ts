export enum ExceptionType { ObjectNotFoundException }

export interface DBException { exceptionType: ExceptionType; message: string; status: number }

export class ExceptionHandler {

	exception: DBException
	constructor(exception: DBException) { this.exception = exception }

	static objectNotFound(message: string) {
		const Exception: DBException = { exceptionType: ExceptionType.ObjectNotFoundException, message: message, status: 404 }
		return new ExceptionHandler(Exception);
	}

}
