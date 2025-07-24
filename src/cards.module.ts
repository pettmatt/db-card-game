import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CardService } from "./services/card.service"
import { CardController } from "./controllers/card.controller"
import { Card } from "./entity/card.entity"

@Module({
	imports: [TypeOrmModule.forFeature([Card])],
	providers: [CardService],
	controllers: [CardController],
})
export class CardsModule {}
