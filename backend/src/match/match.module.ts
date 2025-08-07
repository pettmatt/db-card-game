import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MatchService } from "./match.service"
import { MatchController } from "./match.controller"
import { Match } from "./match.entity"

@Module({
	imports: [TypeOrmModule.forFeature([Match])],
	exports: [TypeOrmModule],
	providers: [MatchService],
	controllers: [MatchController],
})
export class MatchModule {}
