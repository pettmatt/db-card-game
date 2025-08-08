import { type Match, type Card, type State } from "../types/interfaces"
import { setValue } from "../utils/general"

interface Request<T> {
	success: boolean
	message?: string
	record?: T
}

async function cfetch<T>(url: string, request?: RequestInit): Promise<Request<T> | Error> {
	try {
		if (!request) {
			request = {}
			request.method = "GET"
		}

		const response: Response = await fetch(url, request)

		if (!response.ok) {
			throw new Error(`(${response.status}) Request failed: ${response}`)
		}

		return await response.json()
	} catch (err) {
		return err as Error
	}
}

export async function setStateSection<T>(
	state: State, url: string, path: string[], request: RequestInit
) {
	const data: Request<T> | Error = await cfetch<T>(url, request)
	if (!(data instanceof Error)) {
		if (data && data.success && data.record !== undefined) {
			setValue(state, path, data.record)
			console.log("State", path ,"set")
		}
	}
}

export async function fetchStateSection<T>(state: State, url: string, path: string[]) {
	const data: Request<T> | Error = await cfetch<T>(url)
	if (!(data instanceof Error)) {
		if (data && data.success && data.record !== undefined) {
			setValue(state, path, data.record)
			console.log("State", path ,"set")
		}
	}
}

export async function fetchState(): Promise<State> {
	const state: State = {
		phase: 1,
		match: [],
		leaderboard: [{}]
	}

	const base = import.meta.env.VITE_BACKEND_URL
	const deckUrl = `${base}/card/all`
	const matchUrl = `${base}/match/all`

	// Fetch matches and cards
	fetchStateSection<Match[]>(state, matchUrl, ["match"])
	fetchStateSection<Card[]>(state, deckUrl, ["match", "deck"])

	return state
}

export function setMatchState(state: State): State {
	const base = import.meta.env.VITE_BACKEND_URL
	const deckUrl = `${base}/card`
	const matchUrl = `${base}/match`

	const request: RequestInit = {
		method: "POST"
	}

	setStateSection<Match>(state, matchUrl, ["match"], request)

	if (state.match) {
		console.log("Generating cards")
		// Tweak later, so the index is fetched from browser. If not found the application should behave as if there are no matches
		const index = (state.match.length > 1) ? 1 : 0
		const deckLength = state.match[index].deck.maxLength

		for (let i = 0; i < deckLength; i++) {
			setStateSection(state, deckUrl, [], request)
		}

		console.log("Finished generating cards")
	} else {
		console.warn("Cannot generate cards without successful Match instance (match):", state.match)
	}

	return state
}
