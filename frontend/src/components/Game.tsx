import { useEffect, useState } from "react"
import type { GeneralProps, GameRules } from "../types/interfaces"
import Board from "./game/Board"
import Dealer from "./game/Dealer"
import Hand from "./game/Hand"

// For now the logic is handled in memory, later it should be moved to be processed in server

export default function Game(props: GeneralProps) {
	if (!props.show || !props.state) {
		return
	}

	const [rules, setRules] = useState<GameRules | undefined>()
	const [turn, setTurn] = useState("none")
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
				// setRules(undefined)
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
		if (!rules) {
			console.warn("Can't setup game without rules")
			return
		}

		let playerCount = rules.players.max
		setPlayerCount(playerCount)

		if (rules.players.dealer) {
			// Proceeds to dealer setup
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
					roundActionDone={() => proceedPlayerTurn()}
				/>
			))}
		</>
	}

	function DealerWrapper() {
		if (activateDealer) {
			return <Dealer state={props.state} rules={rules}
				setupDone={() => setTurn("player-1")} // When setup is done the game moves to "ping-pong" state until the game is finished.
				roundActionDone={() => setTurn("player-1")}
			/>
		}
	}

	function proceedPlayerTurn() {
		if (playerCount === 1) {
			setTurn("dealer")
		} else {
			let index = JSON.parse(turn.split("-")[1]) as number
			if (index >= playerCount) {
				setTurn("dealer")
			} else {
				setTurn(`player-${index + 1}`)
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