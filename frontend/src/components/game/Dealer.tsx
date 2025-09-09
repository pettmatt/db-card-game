import { useEffect, useState } from "react"
import { ActionEnum, type Card, type Action, type Blackjack, type DealerProps } from "../../types/interfaces"
import { createNewCard } from "../../services/state"
import { getNestedValue } from "../../utils/general"

export default function Dealer(props: DealerProps) {
	if (!props.state || !props.state.current_match_id) return
	const matchId = props.state.current_match_id

	const [cards, setCards] = useState<Card[]>([])
	const [deck, setDeck] = useState<Card[]>([])

	useEffect(() => {
		if (!props.state.matches[matchId].dealer.actions) return

		const action: Action | undefined = props.state.matches[matchId].dealer.actions.pop()

		if (action) {
			if (action.do.description === ActionEnum.CREATE_DECK) {
				let value = getNestedValue(action.do.value)
				for (let i = 0; i < value; i++) {
					createNewCard(props.state, action.owner)
				}

				setDeck(props.state.matches[matchId].cards)
			}

			else if (action.do.description === ActionEnum.MOVE_CARD) { // Means dealing cards to players
				
			}

			else if (action.do.description === ActionEnum.PLAY_CARD) {

			}

			else {
				console.warn(`(Dealer) Unknown action "${action.do.description}".`)
			}
		}
	}, [props.state.matches[matchId].dealer.actions])

	function CardHand() {
		const rules = props.rules as Blackjack
		const cardOrientation = rules.blackjack.round.hand.card_orientation.default

		return <>
			{cards.map((card, index) => {
				return <li key={index} className={"card " + cardOrientation}>{card}</li>
			})}
		</>
	}

	function Deck() {
		return <>
			{deck.map((card, index) => {
				return <li key={index} className={"deck card facedown"}>{card}</li>
			})}
		</>
	}

	return (
		<div className="dealer wrapper">
			Dealer is active
			<ul className="hand">
				<CardHand />
			</ul>
			<ul className="deck">
				<Deck />
			</ul>
		</div>
	)
}