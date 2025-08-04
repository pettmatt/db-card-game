import type { GeneralProps } from "../types/interfaces"

export default function Result(props: GeneralProps) {
	if (!props.show) {
		return
	}

	return (
		<div>
			<EndStats stats={props.state.stats} />
			<Leaderboard leaderborad={props.state.leaderboard} />
		</div>
	)
}