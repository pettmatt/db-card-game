import { DataSource } from "typeorm"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MatchModule } from "./match/match.module"
import { CardModule } from "./card/card.module"
import { Dealer } from "./dealer/dealer.entity"
import { Match } from "./match/match.entity"
import { Card } from "./card/card.entity"
import { Deck } from "./deck/deck.entity"
import { Hand } from "./hand/hand.entity"

@Module({
	imports: [
		CardModule,
		MatchModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "127.0.0.1",
			port: 13306,
			username: "root",
			password: "root",
			database: "gamedb",
			entities: [Match, Card, Deck, Hand, Dealer],
			synchronize: true, // Synchronize is for dev environment, otherwise it should be false
			retryAttempts: 3,
			retryDelay: 5000,
		}),
	],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
