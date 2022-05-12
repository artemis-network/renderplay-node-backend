import { initUser } from './user_init'
import { initializeRendleGames } from './rendle_init'
import { initializeRenderScanGames, RenderScanRefWordInput } from './renderscan_init'

export const init = async (renderScanRefWordAsInput: RenderScanRefWordInput) => {
	try {
		await initUser()
		await initializeRendleGames()
		await initializeRenderScanGames(renderScanRefWordAsInput)
	} catch (e) {
		return e;
	}
}