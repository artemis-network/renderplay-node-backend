import { ErrorTypes } from '../../errors/db.errors'
import { db } from '../../db'

const {
	RenderScan,
	RenderScanQuiz, RenderScanResults, RenderScanContest,
	RenderScanGameType, RenderScanQuizQuestion
} = db


export class RenderScanDocumentFactory {
	static get(renderScanDocs: string) {
		if (renderScanDocs === "renderscan") {
			const newObject = RenderScan;
			return newObject;
		}
		if (renderScanDocs === "renderscan_contest") {
			const newObject = ""
			return newObject;
		}

	}
}

export class DBObject {
	doc: any;
	constructor(doc: any) { this.doc = doc }

	isDocPresent(doc: any): boolean {
		if (this.doc !== null || this.doc !== undefined) return true
		return false
	}

	getDoc() { return this.doc }

}