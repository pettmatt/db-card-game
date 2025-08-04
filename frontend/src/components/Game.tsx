import type { GeneralProps } from "../types/interfaces"

export default function Game(props: GeneralProps) {
	if (!props.show) {
		return
	}

	return (
		<div>
			<Dealer history={props.state.match.dealer_actions} />
			<Board round={props.state.match.board} />
			<Hand cards={props.state.match.hand} />
		</div>
	)
}