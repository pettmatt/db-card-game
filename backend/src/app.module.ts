import { DataSource } from "typeorm"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MatchModule } from "./matches/match.module"
import { Match } from "./matches/match.entity"

@Module({
	imports: [
		MatchModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "127.0.0.1",
			port: 13306,
			username: "root",
			password: "root",
			database: "gamedb",
			entities: [Match],
			synchronize: true, // Synchronize is for dev environment, otherwise it should be false
			retryAttempts: 3,
			retryDelay: 5000,
		}),
	],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
