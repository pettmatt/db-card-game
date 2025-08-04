export interface Board {
	current: Object[]
	previousRounds: Object[][]
}

export interface Match {
	round: number
	hand: Object[]
	dealer_actions: Object[]
	board: Board
	stats: Object
}

export interface State {
	phase: number
	match: Match
	leaderboard: Object[]
}

export interface GeneralProps {
	show: boolean
	state: State
	progress: Function
}