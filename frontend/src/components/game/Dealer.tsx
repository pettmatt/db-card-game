import { useEffect, useState } from "react"
import type { Blackjack, GeneralGameProps } from "../../types/interfaces"

export default function Dealer(props: GeneralGameProps) {
	if (!props.state || !props.state.current_match_id) return
	// Action that is triggered when it's dealer's turn

	const [cards, setCards] = useState([])
	const [deck, setDeck] = useState([])

	if (props.state.current_match_id) {
		const hand = props.state.matches[props.state.current_match_id].hand
		const deckState = props.state.matches[props.state.current_match_id].deck

		useEffect(() => {
			setCards((prevHand) => ({
				...prevHand.concat(hand) // Change logic later, so only uniques are merged
			}))
		}, [hand])

		useEffect(() => {
			setDeck((prevHand) => ({
				...prevHand.concat(hand)
			}))
		}, [deckState])
	}

	const cardHand = cards.map((card, index) => {
		const rules = props.rules as Blackjack
		const cardOrientation = rules.blackjack.round.hand.card_orientation.default
		return <li key={index} className={"card " + cardOrientation}>{card}</li>
	})

	const theDeck = deck.map((card, index) => {
		return <li key={index} className={"deck card facedown"}>{card}</li>
	})

	return (
		<div className="dealer wrapper">
			<ul className="hand">
				{cardHand}
			</ul>
			<ul className="deck">
				{theDeck}
			</ul>
		</div>
	)
}