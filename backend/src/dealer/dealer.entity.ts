import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { randomInt } from "crypto"

// interface WinningCondition {
// 	[key: string]: any
// }

@Entity()
export class Dealer {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: randomInt(4, 6) })
	maxLength: number

	@Column()
	winningCondition: string
}
