import { Repository } from "typeorm"
import { Card } from "./card.entity"

export class CardRepository extends Repository<Card> {
	public async findByOwner(ownerId: number, ownerType: string) {
		return await this.createQueryBuilder("card")
			.where("card.ownerId = :ownerId", { ownerId })
			.andWhere("card.ownerType = :ownerType", { ownerType })
			.getMany()
	}

	public async findById(id: number) {
		return await this.createQueryBuilder("card")
			.where("card.id = :id", { id })
			.getOne()
	}

	public async add(card: Card) {
		return await this.createQueryBuilder("card")
			.insert()
			.values([card])
			.execute()
	}

	public async update(id: number, card: Card) {
		return await this.createQueryBuilder()
			.update(Card)
			.set(card)
			.where("id = :id", { id })
			.execute()
	}
	public async delete(id: number) {
		return await this.createQueryBuilder()
			.delete()
			.from(Card)
			.where("id = :id", { id })
			.execute()
	}
}
