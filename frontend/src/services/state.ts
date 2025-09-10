import type { State, Request, Card, Match, Deck } from "../types/interfaces"
import { setValue } from "../utils/general"
import { cfetch } from "./requests"

const base = import.meta.env.VITE_BACKEND_URL

export async function setStateSection<T>(
	state: State, path: string[], url: string, request: RequestInit
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
			console.log("(Service) State", path ,"set")
		}
	}
}

export async function fetchState(): Promise<State> {
	const state: State = {
		phase: 1,
		matches: [],
		leaderboard: []
	}

	const matchUrl = `${base}/match/all`
	fetchStateSection<Match[]>(state, matchUrl, ["matches"])

	return state
}

export function createNewMatch(state: State): State {
	const matchUrl = `${base}/match`

	const request: RequestInit = {
		method: "POST"
	}

	setStateSection<Match>(state, ["matches"], matchUrl, request)

	// if (state.matches) {
	// 	console.log("Generating cards")
	// 	// Tweak later, so the index is fetched from browser. If not found the application should behave as if there are no matches.
	// 	// It would be better if backend would require the index and only sends relevant match, buuut eh,
	// 	// this is just a little hobby project.
	// 	const index = (state.matches.length > 1) ? 1 : 0
	// 	const deckLength = state.matches[index].deck.maxLength

	// 	for (let i = 0; i < deckLength; i++) {
	// 		setStateSection(state, [], deckUrl, request)
	// 	}

	// 	console.log("Finished generating cards")
	// } else {
	// 	console.warn("Cannot generate cards without successful Match instance (match):", state.matches)
	// }

	return state
}

export function createNewCard(state: State, owner: Deck): State {
	if (!state.current_match_id) {
		console.log("(State) cannot create new card: Id not ")
		return state
	}

	const newCard: Card = {
		ownerId: owner.id,
		ownerType: "deck"
	}

	const cardUrl = `${base}/card`
	const request: RequestInit = {
		method: "POST",
		body: JSON.stringify({ card: newCard }),
	}

	let index = 0
	state.matches.forEach(match => {
		if (match.id !== state.current_match_id) {
			index++
		}
	})

	setStateSection<Match>(state, ["matches", index.toString(), "cards"], cardUrl, request)

	return state
}