export interface Card {
	id: number
	value: number
	hasSeen: boolean
	markedToBeDestroyed: boolean
}

export interface Board {
	current: Card[]
	previousRounds: Card[][]
}

export interface Match {
	round: number
	hand?: Card[]
	deck?: Card[]
	board?: Board
	stats?: Object
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