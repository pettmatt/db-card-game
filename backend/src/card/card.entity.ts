import { randomInt } from "crypto"
import { Dealer } from "src/dealer/dealer.entity"
import { Deck } from "src/deck/deck.entity"
import { Hand } from "src/hand/hand.entity"
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Card {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: randomInt(0, 16) })
	value: number

	@Column({ default: false })
	hasSeen: boolean

	@Column({ default: false })
	markedToBeDestroyed: boolean

	@Column({ default: -1 })
	ownerId: number

	@Column({ default: "" })
	ownerType: string

	owner: Deck | Dealer | Hand
	setOwner(owner: Deck | Dealer | Hand) {
		this.ownerId = owner.id
		this.ownerType = owner.constructor.name
	}
}
