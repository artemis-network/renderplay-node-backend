import { DBErrors } from './errors/db.errors'

export class DBObject {
	object: any;

	constructor(object: any) {
		this.object = object
	}

	get(): any {
		if (
			this.object !== null ||
			this.object !== undefined ||
			this.object !== "null" ||
			this.object !== "undefined"
		) return this.object
		return DBErrors.OBJECT_NOT_FOUND("object does not exist")
	}

}