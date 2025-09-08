import { useEffect, useState } from "react"
import type { Blackjack, PlayerProps } from "../../types/interfaces"

export default function Hand(props: PlayerProps) {
	if (!props.state || !props.state.current_match_id) return

	const [cards, setCards] = useState([])

	if (props.state.current_match_id) {
		const hand = props.state.matches[props.state.current_match_id].hand

		useEffect(() => {
			setCards((prevHand) => ({
				...prevHand.concat(hand)
			}))
		}, [hand])
	}

	const cardHand = cards.map((card, index) => {
		const rules = props.rules as Blackjack
		const cardOrientation = rules.blackjack.round.hand.card_orientation.default
		return <li key={index} className={"card " + cardOrientation}>{card}</li>
	})

	return (
		<div className="hand wrapper">
			player hand
			<ul>
				{cardHand}
			</ul>
		</div>
	)
}