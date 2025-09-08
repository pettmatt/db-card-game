import { StatesEnum } from "../types/enums"
import { type State } from "../types/interfaces"

export function stateValidator(state: State, value: number): boolean {
	const current_phase = state.phase

	// For back button, which is supposed to appear everywhere else, but in the start
	if (value === StatesEnum.Any && current_phase > StatesEnum.Starting) {
		return true
	}

	if (current_phase === value) {
		return true
	}

	return false
}