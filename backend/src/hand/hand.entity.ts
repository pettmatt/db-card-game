import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { randomInt } from "crypto"

@Entity()
export class Hand {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: randomInt(3, 6) })
	maxLength: number
}
