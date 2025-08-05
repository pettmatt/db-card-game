import type { GeneralProps } from "../types/interfaces"

export default function Starting(props: GeneralProps) {
	if (!props.show) {
		return
	}

	return (
		<div>
			<button onClick={() => props.progress}>Start</button>
			{/* <button onClick={progress}>Leaderboard</button> */}
		</div>
	)
}