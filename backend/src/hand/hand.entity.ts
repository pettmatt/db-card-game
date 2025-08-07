import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import { randomInt } from "crypto"
import { Match } from "../match/match.entity"

@Entity()
export class Hand {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: randomInt(3, 6) })
	maxLength: number

	@OneToOne(() => Match, (match) => match.hand)
	match: Match
}
