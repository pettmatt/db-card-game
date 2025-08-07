import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import { randomInt } from "crypto"
import { Match } from "../match/match.entity"

@Entity()
export class Deck {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: randomInt(15, 60) })
	maxLength: number

	@OneToOne(() => Match, (match) => match.deck)
	match: Match
}
