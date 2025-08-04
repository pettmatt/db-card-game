import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, Repository } from "typeorm"
import { Card } from "./card.entity"

export interface Body {
	success: boolean
	message?: string
	record?: Card | Card[] | DeleteResult
}

function responseBody(
	result: Card | Card[] | Error | DeleteResult,
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
export class CardService {
	constructor(
		@InjectRepository(Card)
		private cardRepository: Repository<Card>,
	) {}

	findAll(): Promise<Body> {
		return this.cardRepository
			.find()
			.then((result: Card[]) => responseBody(result))
			.catch((err: Error) => responseBody(err, "fetching all"))
	}

	async findOne(property: string, value: number | boolean): Promise<Body> {
		return this.cardRepository
			.findOneBy({ [property]: value })
			.then((record: Card) => responseBody(record))
			.catch((err: Error) => responseBody(err, "fetching one"))
	}

	async update(id: number, replace: Card): Promise<Body> {
		let card: Card | null = await this.cardRepository.findOneBy({ id })
		let response: Body = { success: false }

		if (card) {
			card = replace
			response = await this.cardRepository
				.save(card)
				.then((record: Card) => responseBody(record, "updated"))
		}

		return response
	}

	async add(card: Card): Promise<Body> {
		return await this.cardRepository
			.save<Card>(card)
			.then((record: Card) => responseBody(record))
			.catch((err: Error) => responseBody(err, "adding a record"))
	}

	async remove(id: number): Promise<Body> {
		return await this.cardRepository
			.delete(id)
			.then((record: DeleteResult) => responseBody(record, "removed"))
			.catch((err: Error) => responseBody(err, "removing a record"))
	}
}
