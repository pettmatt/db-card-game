import { useEffect, useState } from "react"
import type { Blackjack, GameProps, GameRules } from "../types/interfaces"
import Board from "./game/Board"
import Dealer from "./game/Dealer"
import Hand from "./game/Hand"

// For now the logic is handled in memory, later it should be moved to be processed in server

export default function Game(props: GameProps) {
	if (!props.show) {
		return
	}

	const [rules, setRules] = useState<GameRules | undefined>(undefined)

	useEffect(() => {
		fetch("../json/games.json")
			.then((response) => response.json())
			.then((file) => {
				let gameRules = file["blackjack"] as Blackjack

				setRules(gameRules)
				console.log("Rules are set", rules)
			})
			.catch(() => setRules(undefined))
	}, [])

	return (
		<div>
			<Board state={props.state.matches[props.id]} />
			<Dealer state={props.state.matches[props.id]} />
			<Hand state={props.state.matches[props.id]} />
		</div>
	)
}