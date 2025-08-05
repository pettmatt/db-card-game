import { useState, useEffect, type SetStateAction } from "react"
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
		let initStarted = new Date()
		fetchState()
			.then(newState => {
				if (state !== newState) {
					setState(newState)
					const passedTime = new Date().getTime() - initStarted.getTime()
					console.log(`Initializing state took ${passedTime}ms`)
				} else {
					console.log("(App) No changes in state")
				}
			})
			.catch(err => console.warn("(App) Couldn't fetch state:", err))
	}, [])

	useEffect(() => {
		console.log("(App) State changed", (state) ? state : "and has initial undefined value")
	}, [state])

	function progressState() {
		const currentPhase = state?.phase
		setState((prevState: SetStateAction<State | undefined>) => ({
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
			<h2>State declared probably incorrectly</h2>
		</main>
	)
}

export default App
