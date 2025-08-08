import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, Repository } from "typeorm"
import { Match } from "./match.entity"
import { type Body, responseBody } from "../utils/service"

@Injectable()
export class MatchService {
	constructor(
		@InjectRepository(Match)
		private matchRepository: Repository<Match>,
	) {}

	async findAll(): Promise<Body<Match | Error>> {
		return this.matchRepository
			.find()
			.then((result: Match[]) => responseBody(result))
			.catch((err: Error) => responseBody(err, "fetching all"))
	}

	async findOne(
		property: string,
		value: number | boolean | string,
	): Promise<Body<Match | Error>> {
		return this.matchRepository
			.findOneBy({ [property]: value })
			.then((record: Match) => responseBody(record))
			.catch((err: Error) => responseBody(err, "fetching one"))
	}

	async update(id: number, replace: Match): Promise<Body<Match>> {
		let match: Match | null = await this.matchRepository.findOneBy({ id })
		let response: Body<Match> = {
			success: false,
			message: `Record "${id}" doesn't exists`,
		}

		if (match) {
			match = replace
			response = await this.matchRepository
				.save(match)
				.then((record: Match) => responseBody(record, "updated"))
		}

		return response
	}

	async add(match: Match): Promise<Body<Match | Error>> {
		return this.matchRepository
			.save<Match>(match)
			.then((record: Match) => responseBody(record))
			.catch((err: Error) => responseBody(err, "adding a record"))
	}

	async remove(id: number): Promise<Body<Match | Error | DeleteResult>> {
		return this.matchRepository
			.delete(id)
			.then((record: DeleteResult) => responseBody(record, "removed"))
			.catch((err: Error) => responseBody(err, "removing a record"))
	}
}
