import { useState, useEffect } from "react"
import "./App.css"
import { type State } from "./types/interfaces"
import { fetchState } from "./services/requests"
import { stateValidator } from "./services/validate"
import Result from "./components/Result"
import Game from "./components/Game"
import Continue from "./components/Continue"
import Starting from "./components/Starting"

enum States {
	Starting = 1,
	Continue = 2,
	Game = 3,
	Result = 4,
}

function App() {
	const [state, setState] = useState<State>()

	useEffect(() => {
		const currentState = fetchState()
		if (state !== currentState) {
			setState(currentState)
		}
	}, [])

	useEffect(() => {
		console.log("State changed", state)
	}, [state])

	function progressState() {
		let currentPhase = state?.phase
		setState((prevState: State) => ({
			...prevState,
			phase: (currentPhase >= 4) ? 1 : prevState.phase + 1
		}))
	}

	if (state) {
		return (
			<main>
				<Starting show={stateValidator(state, States.Starting)} state={state} progress={progressState} />
				<Continue show={stateValidator(state, States.Continue)} state={state} progress={progressState} />
				<Game show={stateValidator(state, States.Game)} state={state} progress={progressState} />
				<Result show={stateValidator(state, States.Result)} state={state} progress={progressState} />
			</main>
		)
	}

	return (
		<main>
			<h2>State declared incorrectly</h2>
		</main>
	)
}

export default App
