import { initUser } from './user_init'
import { initializeRendleGames } from './rendle_init'
import { initializeRenderScanGames, RenderScanRefWordInput } from './renderscan_init'
import { logger } from '../utils/logger'

export const init = async (renderScanRefWordAsInput: RenderScanRefWordInput) => {
	try {
		logger.info(`>> initialization began`)
		await initUser()
		await initializeRendleGames()
		await initializeRenderScanGames(renderScanRefWordAsInput)
		logger.info(`>> initialization completed`)
	} catch (e) {
		return e;
	}
}