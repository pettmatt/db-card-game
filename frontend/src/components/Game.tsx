import { useEffect, useState } from "react"
import type { GeneralProps, GameRules } from "../types/interfaces"
import Board from "./game/Board"
import Dealer from "./game/Dealer"
import Hand from "./game/Hand"

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
			console.log("Dealer activated")
			setActivateDealer(true)
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

		return <Dealer state={props.state} rules={rules}
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