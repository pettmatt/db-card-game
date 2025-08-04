import { type State } from "../types/interfaces"

export function stateValidator(state: State, value: number): boolean {
	if (state.phase === value) {
		return true
	}

	return false
}
