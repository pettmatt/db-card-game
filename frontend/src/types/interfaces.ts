export interface Request<T> {
	success: boolean
	message?: string
	record?: T
}

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
	current_match_id?: number
	phase: number
	matches: Match[]
	leaderboard: object[]
}

export interface GeneralProps {
	show: boolean
	state: State
	progress: Function
}

export interface GeneralGameProps {
	state: State,
	rules: GameRules | Blackjack | undefined // Remove undefined later
}

export interface DealerProps extends GeneralGameProps {
	setupDone: Function,
	roundActionDone: Function,
}

export interface PlayerProps extends GeneralGameProps {
	roundActionDone: Function,
}

// Game
interface Ask {
	message: string,
	ask_state: object
}

export interface GameRules {
	players: {
		min: number,
		max: number,
		dealer: true
	},
	round: {
		hand: {
			card_orientation: object,
			ask: {
				message: string,
				ask_state: object
			}
		},
		dealer: {
			hand: Ask,
			action: object
		}
	},
	end: {
		hand: object,
		dealer: object
	},
	win_condition: {
		multiple_conditions: boolean,
		hand: object[]
	}
}

interface BlackjackHandWinCondition {
	value: string[] | number[]
}

export interface Blackjack extends GameRules {
	blackjack: {
		round: {
			hand: {
				card_orientation: {
					default: "faceup"
				},
				ask: {
					message: string,
					ask_state: { hit: boolean, stay: boolean }
				}
			},
			dealer: {
				action: {
					hit: boolean,
					card_orientation: string,
					draw: number
				},
			}
		},
		end: {
			hand: { is_done: boolean },
			dealer: { cards: { face_orientation: "facedown", new_value: "faceup" }}
		},
		win_condition: {
			hand: BlackjackHandWinCondition[]
		}
	}
	[name: string]: any
}
