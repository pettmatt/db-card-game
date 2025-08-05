import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { CardService } from "./card.service"
import { Card } from "./card.entity"

@Controller("card")
export class CardController {
	constructor(private cardRepository: CardService) {}

	@Get("all")
	findAll() {
		return this.cardRepository.findAll()
	}

	@Get(":property/:value")
	findOne(
		@Param("property") property: string,
		@Param("value") value: number | boolean,
	) {
		return this.cardRepository.findOne(property, value)
	}

	@Post()
	add(@Body() card?: Card) {
		return this.cardRepository.add(card || new Card())
	}

	@Put(":id")
	modify(@Param("id") id: number, @Body() card: Card) {
		return this.cardRepository.update(id, card)
	}

	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.cardRepository.remove(id)
	}
}
