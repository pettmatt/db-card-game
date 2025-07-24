import { Controller } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Card } from "../entity/card.entity"
import { Repository } from "typeorm"

@Controller()
export class CardController {
	constructor(
		@InjectRepository(Card)
		private cardRepository: Repository<Card>,
	) {}

	// initialize(): string {}
	// add(): string {}
	// modify(): string {}
	// result(): string {}

	findAll(): Promise<Card[]> {
		return this.cardRepository.find()
	}
	async findOne(
		property: string,
		value: number | boolean,
	): Promise<Card | null> {
		return this.cardRepository.findOneBy({ [property]: value })
	}
	async modify(
		id: number,
		property: string,
		value: number | boolean,
	): Promise<boolean> {
		const card: Card | null = await this.cardRepository.findOneBy({ id })
		let response = false

		if (card) {
			card[property] = value
			await this.cardRepository.save(card).then(() => (response = true))
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
