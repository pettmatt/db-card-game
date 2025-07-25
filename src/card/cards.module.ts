import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CardService } from "./card.service"
import { CardController } from "./card.controller"
import { Card } from "./card.entity"

@Module({
	imports: [TypeOrmModule.forFeature([Card])],
	exports: [TypeOrmModule],
	providers: [CardService],
	controllers: [CardController],
})
export class CardsModule {}
