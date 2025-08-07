import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { CardRepository } from "./card.repository"
import { Card } from "./card.entity"

@Controller("card")
export class MatchController {
	constructor(private cardRepository: CardRepository) {}

	@Get("all/:ownerId/:ownerType")
	findAll(
		@Param("ownerId") ownerId: number,
		@Param("ownerType") ownerType: string,
	) {
		return this.cardRepository.findByOwner(ownerId, ownerType)
	}

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.cardRepository.findById(id)
	}

	@Post(":ownerId/:ownerType")
	add(
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
		return this.cardRepository.delete(id)
	}
}
