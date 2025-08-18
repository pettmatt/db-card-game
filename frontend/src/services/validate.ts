import { StatesEnum } from "../types/enums"
import { type State } from "../types/interfaces"

export function stateValidator(state: State, value: number): boolean {
	if (value === StatesEnum.Any && state.phase > StatesEnum.Starting) {
		return true
	}

	if (state.phase === value) {
		return true
	}

	return false
}
