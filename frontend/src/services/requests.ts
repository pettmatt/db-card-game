import { type Card, type State } from "../types/interfaces"

interface Request<T> {
	success: boolean
	message?: string
	record?: T
}

async function cfetch<T>(url: string): Promise<Request<T> | Error> {
	try {
		const response: Response = await fetch(url)

		if (!response.ok) {
			throw new Error(`(${response.status}) Request failed: ${response}`)
		}

		return await response.json()
	} catch (err) {
		return err as Error
	}
}

export async function fetchState(): Promise<State> {
	const deckUrl = `${import.meta.env.VITE_BACKEND_URL}/card/all`

	const state: State = {
		phase: 1,
		match: {
			round: 0,
			hand: undefined,
			deck: undefined,
			board: {
				current: [],
				previousRounds: [[]]
			},
			stats: undefined
		},
		leaderboard: [{}]
	}

	const deckData: Request<Card[]> | Error = await cfetch<Card[]>(deckUrl)
	if (!(deckData instanceof Error)) {
		if (deckData && deckData.success && deckData.record !== undefined) {
			state.match.deck = deckData.record
			console.log("Deck state set")
		}
	}

	return state
}
