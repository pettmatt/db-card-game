import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Card } from "./card.entity"
import { DeleteResult, Repository } from "typeorm"
import { type Body, responseBody } from "../utils/service"

@Injectable()
export class CardService {
	constructor(
		@InjectRepository(Card)
		private cardRepository: Repository<Card>,
	) {}

	async findAll(): Promise<Body<Card | Error>> {
		return this.cardRepository
			.find()
			.then((result: Card[]) => responseBody(result))
			.catch((err: Error) => responseBody(err, "fetching all"))
	}

	async findByOwner(
		ownerId: number,
		ownerType: string,
	): Promise<Body<Card | Error>> {
		return this.cardRepository
			.find({
				where: {
					ownerId,
					ownerType,
				},
			})
			.then((result: Card[]) => responseBody(result))
			.catch((err: Error) => responseBody(err, "fetching by owner"))
	}

	async findBy(property: string, value: number | boolean | string) {
		return this.cardRepository
			.findOneBy({ [property]: value })
			.then((result: Card) => responseBody(result))
			.catch((err: Error) => responseBody(err, "fetching by id"))
	}

	async add(card: Card): Promise<Body<Card | Error>> {
		return this.cardRepository
			.save<Card>(card)
			.then((record: Card) => responseBody(record))
			.catch((err: Error) => responseBody(err, "adding a record"))
	}

	async update(id: number, replace: Card): Promise<Body<Card>> {
		let card: Card | null = await this.cardRepository.findOneBy({ id })
		let response: Body<Card> = {
			success: false,
			message: `Record "${id}" doesn't exists`,
		}

		if (card) {
			card = replace
			response = await this.cardRepository
				.save(card)
				.then((record: Card) => responseBody(record, "updated"))
		}

		return response
	}

	async remove(id: number): Promise<Body<Card | Error | DeleteResult>> {
		return this.cardRepository
			.delete(id)
			.then((record: DeleteResult) => responseBody(record, "removed"))
			.catch((err: Error) => responseBody(err, "removing a record"))
	}
}
