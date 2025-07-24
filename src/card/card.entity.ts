import { randomInt } from "crypto"
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
}
