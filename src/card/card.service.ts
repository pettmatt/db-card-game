import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Card } from "./card.entity"

@Injectable()
export class CardService {
	constructor(
		@InjectRepository(Card)
		private cardRepository: Repository<Card>,
	) {}

	findAll(): Promise<Card[]> {
		return this.cardRepository.find()
	}

	async findOne(
		property: string,
		value: number | boolean,
	): Promise<Card | null> {
		return this.cardRepository.findOneBy({ [property]: value })
	}

	async modify(id: number, replace: Card): Promise<boolean> {
		let card: Card | null = await this.cardRepository.findOneBy({ id })
		let response = false

		if (card) {
			card = replace
			response = await this.cardRepository
				.save(card)
				.then(() => (response = true))
		}

		return response
	}

	async add(card: Card): Promise<boolean> {
		return this.cardRepository
			.save<Card>(card)
			.then(() => true)
			.catch(() => false)
	}

	async remove(id: number): Promise<boolean> {
		return await this.cardRepository
			.delete(id)
			.then(() => true)
			.catch(() => false)
	}
}
