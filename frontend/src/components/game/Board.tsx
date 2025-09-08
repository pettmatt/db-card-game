import type { GeneralGameProps } from "../../types/interfaces"

export default function Board(props: GeneralGameProps) {
	if (!props.state || !props.state.current_match_id) return

	return (
		<div className="board wrapper">
			<h3 className="hide">Round {props.state.matches[props.state.current_match_id].round}</h3>
			<div className="panel">
				Match-id:{props.state.current_match_id}
			</div>
		</div>
	)
}