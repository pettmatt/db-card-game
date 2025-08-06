import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { randomInt } from "crypto"

@Entity()
export class Deck {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: randomInt(15, 60) })
	maxLength: number
}
