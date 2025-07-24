import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DataSource } from "typeorm"
import { Card } from "./card/card.entity"

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "password",
			database: "testdb",
			entities: [Card],
			synchronize: true, // Synchronize is for dev environment, otherwise it should be false
			retryAttempts: 3,
			retryDelay: 5000,
		}),
	],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
