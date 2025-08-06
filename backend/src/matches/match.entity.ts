import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { randomInt } from "crypto"

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: false })
	finished: boolean

	@Column({ default: randomInt(3, 10) })
	rounds: number

	@Column()
	deck: string

	@Column()
	hand: string

	@Column()
	dealer: string
}
