import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, Repository } from "typeorm"
import { Match } from "./match.entity"

export interface Body {
	success: boolean
	message?: string
	record?: Match | Match[] | DeleteResult
}

function responseBody(
	result: Match | Match[] | Error | DeleteResult,
	message?: string,
): Body {
	const body: Body = { success: false }

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

@Injectable()
export class MatchService {
	constructor(
		@InjectRepository(Match)
		private matchRepository: Repository<Match>,
	) {}

	async findAll(): Promise<Body> {
		return this.matchRepository
			.find()
			.then((result: Match[]) => responseBody(result))
			.catch((err: Error) => responseBody(err, "fetching all"))
	}

	async findOne(property: string, value: number | boolean): Promise<Body> {
		return this.matchRepository
			.findOneBy({ [property]: value })
			.then((record: Match) => responseBody(record))
			.catch((err: Error) => responseBody(err, "fetching one"))
	}

	async update(id: number, replace: Match): Promise<Body> {
		let match: Match | null = await this.matchRepository.findOneBy({ id })
		let response: Body = { success: false }

		if (match) {
			match = replace
			response = await this.matchRepository
				.save(match)
				.then((record: Match) => responseBody(record, "updated"))
		}

		return response
	}

	async add(match: Match): Promise<Body> {
		return await this.matchRepository
			.save<Match>(match)
			.then((record: Match) => responseBody(record))
			.catch((err: Error) => responseBody(err, "adding a record"))
	}

	async remove(id: number): Promise<Body> {
		return await this.matchRepository
			.delete(id)
			.then((record: DeleteResult) => responseBody(record, "removed"))
			.catch((err: Error) => responseBody(err, "removing a record"))
	}
}
