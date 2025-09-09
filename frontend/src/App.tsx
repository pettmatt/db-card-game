import "./App.css"
import { useState, useEffect } from "react"
import { type State } from "./types/interfaces"
import { StatesEnum } from "./types/enums"
import { stateValidator } from "./services/validate"
import { fetchState } from "./services/state"
import Continue from "./components/Continue"
import Starting from "./components/Starting"
import Result from "./components/Result"
import Game from "./components/Game"
import Back from "./components/Back"

function App() {
	const [state, setState] = useState<State>()
	const [stateHistory, setStateHistory] = useState<State[]>([])

	useEffect(() => {
		let initStarted = new Date()
		fetchState()
			.then((newState: State) => {
				if (state !== newState) {
					setState(newState)
					const passedTime = new Date().getTime() - initStarted.getTime()
					console.log(`Initializing state took ${passedTime}ms`)
				} else {
					console.log("(App) No changes in state")
				}
			})
			.catch((error: Error) => console.warn("(App) Couldn't fetch state:", error))
	}, [])

	useEffect(() => {
		console.log("(App) State changed", (state) ? state : "and has initial undefined value")
	}, [state])

	function handleStateHistory(previousState: State | undefined) {
		const list = stateHistory
		const lastState = previousState || state

		if (lastState) {
			list.push(lastState)
		}

		setStateHistory(list)
	}

	function progressState(stateEnum: StatesEnum) {
		const currentPhase = state ? state.phase : 1

		setState((previousState) => {
			if (previousState) {
				handleStateHistory(previousState as State)
				return {
					...previousState,
					phase: stateEnum || (currentPhase >= 4) ? 1 : previousState.phase + 1
				}
			} else {
				console.warn("Cannot progress state, because it wasn't set correctly.")
			}
		})
	}

	function previousState() {
		const prevState = stateHistory.pop()
		setState(prevState)
	}

	if (!state) {
		return (
			<main>
				<h2>State declared probably incorrectly</h2>
			</main>
		)
	}

	return (
		<main>
			<Starting show={stateValidator(state, StatesEnum.Starting)} state={state} progress={progressState} />
			<Continue show={stateValidator(state, StatesEnum.Continue)} state={state} progress={progressState} />
			<Game show={stateValidator(state, StatesEnum.Game)} state={state} progress={progressState} />
			<Result show={stateValidator(state, StatesEnum.Result)} state={state} progress={progressState} />
			<Back show={stateValidator(state, StatesEnum.Any)} state={state} progress={previousState} />
		</main>
	)
}

export default App
