import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import { randomInt } from "crypto"
import { Match } from "../match/match.entity"

// interface WinningCondition {
// 	[key: string]: any
// }

@Entity()
export class Dealer {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: randomInt(4, 6) })
	maxLength: number

	@Column({ default: "" })
	winningCondition: string

	@OneToOne(() => Match, (match) => match.dealer)
	match: Match
}
