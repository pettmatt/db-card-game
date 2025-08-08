export interface Card {
	id: number
	value: number
	hasSeen: boolean
	markedToBeDestroyed: boolean
}

type JsonString = string

export interface Deck {
	id: number
	maxLength: number
}

export interface Hand {
	id: number
	maxLength: number
}

export interface Dealer {
	id: number
	maxLength: number
	winningCondition: JsonString
}

export interface IBoard {
	current: Card[]
	previousRounds: Card[][]
}

export interface Match {
	id?: number
	round?: number
	finished?: boolean
	maxRounds?: number
	rounds?: number
	hand?: any
	deck?: any
	dealer?: any
	stats?: Object
}

export interface State {
	phase: number
	match: Match[]
	leaderboard: object[]
}

export interface GeneralProps {
	show: boolean
	state: State
	progress: Function
}