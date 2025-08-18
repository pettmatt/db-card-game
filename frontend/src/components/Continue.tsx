import { createNewMatch } from "../services/match"
import type { GeneralProps } from "../types/interfaces"

export default function Continue(props: GeneralProps) {
	if (!props.show) {
		return
	}

	async function createMatch() {
		// Whenever the database is updated the state should also be updated.
		const response = await createNewMatch()

		if (!(response instanceof Error)) {
			props.progress()
		}
	}

	function continueMatch() {
		const match = props.state.matches.pop()
		props.state.current_match_id = (match) ? match.id : 0
		props.progress()
	}

	return (
		<div className="flex">
			<button onClick={continueMatch}>Continue previous match</button>
			<button onClick={createMatch}>Start a new one</button>
		</div>
	)
}