import { useEffect, useState } from "react"
import type { Blackjack, GeneralGameProps } from "../../types/interfaces"

export default function Hand(props: GeneralGameProps) {
	if (!props.state || !props.state.current_match_id) return
	// Action that is triggered when it's hand's turn
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
			<ul>
				{cardHand}
			</ul>
		</div>
	)
}