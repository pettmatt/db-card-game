import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
} from "typeorm"
import { randomInt } from "crypto"
import { Dealer } from "../dealer/dealer.entity"
import { Deck } from "../deck/deck.entity"
import { Hand } from "../hand/hand.entity"

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: false })
	finished: boolean

	@Column({ default: 0 })
	rounds: number

	@Column({ default: randomInt(3, 10) })
	maxRounds: number

	@OneToOne(() => Deck)
	@JoinColumn()
	deck: Deck

	@OneToOne(() => Hand)
	@JoinColumn()
	hand: Hand

	@OneToOne(() => Dealer)
	@JoinColumn()
	dealer: Dealer
}
