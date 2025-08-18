import type { Request } from "../types/interfaces"

export async function cfetch<T>(url: string, request?: RequestInit): Promise<Request<T> | Error> {
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
