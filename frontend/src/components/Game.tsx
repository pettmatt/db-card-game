import { useEffect, useRef, useState } from "react"
import { type GeneralProps, type GameRules, type Action, type Match } from "../types/interfaces"
import Board from "./game/Board"
import Dealer from "./game/Dealer"
import Hand from "./game/Hand"
import { createNewCard } from "../services/state"

// For now the logic is handled in memory, later it should be moved to be processed in server

const Turn = Object.freeze({
	NONE: -1,
	DEALER: 0,
	PLAYER: 1,
})

export default function Game(props: GeneralProps) {
	if (!props.show || !props.state) return

	const [rules, setRules] = useState<GameRules | undefined>()
	const [turn, setTurn] = useState<number>(Turn.NONE) // -1 none
	const [playerCount, setPlayerCount] = useState(0)
	const [activateDealer, setActivateDealer] = useState(false)

	const matchIndex = useRef(0)

	useEffect(() => {
		fetch("/json/games.json")
			.then((response) => response.json())
			.then((file) => {
				const gameRules = file["blackjack"]
				console.log("Structure", gameRules, gameRules.players)
				setRules(gameRules)
			})
			.catch((error: Error) => {
				setRules(undefined)
				console.warn("Unable to set game rules:", error)
			})

		// Make sure state has required values
		if (props.state.matches) {
			props.state.matches = props.state.matches.map(match => {
				if (!match.dealer.actions) {
					match.dealer.actions = []
				}
				return match
			})
		}
	}, [])

	useEffect(() => {
		console.log("(Game) Rules have been set:", rules)
		if (rules) {
			console.log("(Game) Setup can be started.")
			startGameSetup()
		}
	}, [rules])

	useEffect(() => {
		console.log(`(Game) Turn has changed to "${turn}".`)
	}, [turn])

	function startGameSetup() {
		console.log("Moved to StartGameSetup()")
		if (!rules) {
			console.warn("Can't move to setup phase without rules.")
			return
		}

		setPlayerCount(rules.players.max)

		if (rules.players.dealer) {
			// Proceeds to dealer setup
			const id = props.state.current_match_id
			if (id) {
				console.log("Dealer activated", id, props.state)
				
				const match: Match | undefined = props.state.matches.find((match) => match.id === id)
				if (!match) {
					console.warn(`(Game) Match with id of "${id}" couldn't be found.`)
					return
				}
				
				matchIndex.current = props.state.matches.indexOf(match)
				const deckLength = props.state.matches[matchIndex.current].deck.maxLength
				setActivateDealer(true)

				for (let i = 0; i < deckLength; i++) {
					const createCard: Action = {
						owner: props.state.matches[matchIndex.current].deck,
						execute: () => {
							createNewCard(props.state, props.state.matches[matchIndex.current].deck)
						}
					}
					props.state.matches[matchIndex.current].dealer.actions.push(createCard)
				}

				console.log("(Game) Generic setup done.")
			}
		}
	}

	function PlayerWrapper() {
		if (playerCount === 0) {
			return null
		}

		const players = Array.from({ length: playerCount })
		return <>
			{players.map((_, index) => (
				<Hand key={index} state={props.state} rules={rules}
					roundActionDone={() => processPlayerTurn()}
				/>
			))}
		</>
	}

	function DealerWrapper() {
		if (!activateDealer) {
			return <h3>Dealer not activated</h3>
		}

		if (!rules || !props.state.current_match_id) {
			return <h3>Dealer is missing some values</h3>
		}

		return <Dealer
			rules={rules}
			match={props.state.matches[matchIndex.current]}
			current_match_id={props.state.current_match_id}
			// When setup is done the game moves to "ping-pong" state until the game is finished.
			setupDone={() => setTurn(Turn.PLAYER)}
			roundActionDone={() => setTurn(Turn.PLAYER)}
		/>
	}

	function processPlayerTurn() {
		if (playerCount === 1) {
			setTurn(Turn.DEALER)
		} else {
			if (turn >= playerCount) {
				setTurn(Turn.DEALER)
			} else {
				setTurn(turn + 1) // If there is more than 1 player, move to next player's turn.
			}
		}
	}

	return (
		<div>
			<h2>Game</h2>
			{/* <Board state={props.state} rules={rules} /> */}
			<DealerWrapper />
			<PlayerWrapper />
		</div>
	)
}