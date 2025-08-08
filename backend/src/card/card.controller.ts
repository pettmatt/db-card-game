import { Controller, Param, Body, Get, Post, Put, Delete } from "@nestjs/common"
import { CardService } from "./card.service"
import { Card } from "./card.entity"

@Controller("card")
export class CardController {
	constructor(private cardRepository: CardService) {}

	@Get("all")
	findAll() {
		return this.cardRepository.findAll()
	}

	@Get("all/:ownerId/:ownerType")
	findAllByOwner(
		@Param("ownerId") ownerId: number,
		@Param("ownerType") ownerType: string,
	) {
		return this.cardRepository.findByOwner(ownerId, ownerType)
	}

	@Get(":property/:value")
	findOne(
		@Param("property") property: string,
		@Param("value") value: number,
	) {
		return this.cardRepository.findBy(property, value)
	}

	@Post()
	add(@Body() card?: Card) {
		return this.cardRepository.add(card || new Card())
	}

	@Post(":ownerId/:ownerType")
	addWithOwner(
		@Param("ownerId") ownerId: number,
		@Param("ownerType") ownerType: string,
		@Body() card?: Card,
	) {
		const c = card || new Card()
		c.ownerId = ownerId
		c.ownerType = ownerType

		return this.cardRepository.add(c)
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
