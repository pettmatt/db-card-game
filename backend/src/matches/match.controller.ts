import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { MatchService } from "./match.service"
import { Match } from "./match.entity"

@Controller("match")
export class MatchController {
	constructor(private matchRepository: MatchService) {}

	@Get("all")
	findAll() {
		return this.matchRepository.findAll()
	}

	@Get(":property/:value")
	findOne(
		@Param("property") property: string,
		@Param("value") value: number | boolean,
	) {
		return this.matchRepository.findOne(property, value)
	}

	@Post()
	add(@Body() match?: Match) {
		return this.matchRepository.add(match || new Match())
	}

	@Put(":id")
	modify(@Param("id") id: number, @Body() match: Match) {
		return this.matchRepository.update(id, match)
	}

	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.matchRepository.remove(id)
	}
}
