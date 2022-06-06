import { ExceptionHandler } from '../../exceptions/db.exceptions'
import { renderScanDomainObjects, RENDER_SCAN_MODEL } from '../renderscan.objects'

const {
	RenderScan,
	RenderScanQuiz, RenderScanResults, RenderScanContest,
	RenderScanRefWord, RenderScanGameType, RenderScanQuizQuestion
} = renderScanDomainObjects

type RenderScanModels = RENDER_SCAN_MODEL;


export class RenderScanDocumentFactory {
	static get(renderScanDocs: string) {
		if (renderScanDocs === "renderscan") {
			const newObject: RENDER_SCAN_MODEL = RenderScan;
			return newObject;
		}
		if (renderScanDocs === "renderscan_contest") {
			const newObject = ""
			return newObject;
		}

	}
}

export class DBObject {
	doc: RenderScanModels;
	constructor(doc: RenderScanModels) { this.doc = doc }

	isDocPresent(doc: RenderScanModels): boolean {
		if (this.doc !== null || this.doc !== undefined) return true
		return false
	}

	getDoc() { return this.doc }

}