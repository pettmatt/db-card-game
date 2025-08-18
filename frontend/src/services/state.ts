import type { State, Request, Card, Match } from "../types/interfaces"
import { setValue } from "../utils/general"
import { cfetch } from "./requests"

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
		matches: [],
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

	if (state.matches) {
		console.log("Generating cards")
		// Tweak later, so the index is fetched from browser. If not found the application should behave as if there are no matches.
		// It would be better if backend would require the index and only sends relevant match, buuut eh,
		// this is just a little hobby project.
		const index = (state.matches.length > 1) ? 1 : 0
		const deckLength = state.matches[index].deck.maxLength

		for (let i = 0; i < deckLength; i++) {
			setStateSection(state, deckUrl, [], request)
		}

		console.log("Finished generating cards")
	} else {
		console.warn("Cannot generate cards without successful Match instance (match):", state.matches)
	}

	return state
}