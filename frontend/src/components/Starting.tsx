import { StatesEnum } from "../types/enums"
import type { GeneralProps } from "../types/interfaces"

export default function Starting(props: GeneralProps) {
	if (!props.show) {
		return
	}

	function startClick() {
		props.progress()
	}

	function leaderboardClick() {
		props.progress(StatesEnum.Result)
	}

	return (
		<div className="flex">
			<button onClick={startClick}>Start</button>
			<button onClick={leaderboardClick}>Leaderboard</button>
		</div>
	)
}