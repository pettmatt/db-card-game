import { Body, Controller, Delete, Get, Post } from "@nestjs/common"
import { CardService } from "./card.service"
import { Card } from "./card.entity"

@Controller("card")
export class CardController {
	constructor(private cardRepository: CardService) {}

	// initialize(): string {}
	// add(): string {}
	// modify(): string {}
	// result(): string {}

	@Get()
	findAll(): Promise<Card[]> {
		return this.cardRepository.findAll()
	}

	@Get()
	findOne(property: string, value: number | boolean): Promise<Card | null> {
		return this.cardRepository.findOne(property, value)
	}

	@Post()
	add(@Body() card: Card) {
		return this.cardRepository.add(card)
	}

	@Post()
	modify(id: number, @Body() card: Card) {
		return this.cardRepository.modify(id, card)
	}

	@Delete()
	remove(id: number) {
		return this.cardRepository.remove(id)
	}
}
