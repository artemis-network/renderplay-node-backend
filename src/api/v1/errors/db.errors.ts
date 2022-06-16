export enum ErrorTypes { OBJECT_NOT_FOUND_ERROR }

export class DBErrors extends Error {
	static OBJECT_NOT_FOUND(message: string) {
		const error: Error = {
			message: message,
			name: ErrorTypes.OBJECT_NOT_FOUND_ERROR.toString(),
		}
		throw error;
	}
}
