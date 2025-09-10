import { createNewMatch } from "../services/state"
import type { GeneralProps } from "../types/interfaces"

export default function Continue(props: GeneralProps) {
	if (!props.show) return

	async function createMatch() {
		createNewMatch(props.state)
		props.progress()
	}

	function continueMatch() {
		const match = props.state.matches[0]
		props.state.current_match_id = (match) ? match.id : -1
		props.progress()
	}

	return (
		<div className="flex">
			{ props.state.matches.length > 0 &&
				<button onClick={continueMatch}>Continue previous match</button>
			}
			<button onClick={createMatch}>Start a new one</button>
		</div>
	)
}