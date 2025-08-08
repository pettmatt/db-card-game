import { DeleteResult } from "typeorm"

export interface Body<T> {
	success: boolean
	message?: string
	record?: T | T[] | DeleteResult
}

export function responseBody<T>(
	result: T | T[] | Error | DeleteResult,
	message?: string,
): Body<T> {
	const body: Body<T> = { success: false }

	if (!(result instanceof Error)) {
		body.success = true

		if (message) {
			body.message = `Record ${message}: ${JSON.stringify(result)}`
		} else {
			body.record = result
		}
	} else {
		const res = typeof result == "string" ? result : JSON.stringify(result)
		body.message = `Error occured while ${message}: ${res}`
	}

	return body
}
