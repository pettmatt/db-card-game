import { TypeOrmModule } from "@nestjs/typeorm"
import { Test, TestingModule } from "@nestjs/testing"
import { MatchController } from "../match.controller"
import { MatchService } from "../match.service"
import { Match } from "../match.entity"
import { Body } from "../match.service"

describe("MatchService + MatchController", () => {
	let service: MatchService
	let controller: MatchController
	let previousRecord: Match

	beforeEach(async () => {
		const db = TypeOrmModule.forRoot({
			type: "mysql",
			host: "127.0.0.1",
			port: 13306,
			username: "root",
			password: "root",
			database: "gamedb",
			entities: [Match],
			synchronize: true,
		})

		const module: TestingModule = await Test.createTestingModule({
			imports: [db, TypeOrmModule.forFeature([Match])],
			providers: [MatchService],
			controllers: [MatchController],
		}).compile()

		service = module.get<MatchService>(MatchService)
		controller = module.get<MatchController>(MatchController)
	})

	it("service should be defined", () => {
		expect(service).toBeDefined()
	})
	it("controller should be defined", () => {
		expect(controller).toBeDefined()
	})

	describe("Getting all records", () => {
		it("should return an empty array", async () => {
			const result = await controller.findAll()
			expect(result.success).toBe(true)
		})
	})

	describe("Add a record", () => {
		it("should return the record when added", async () => {
			const match: Match = new Match()
			previousRecord = match
			const result = await controller.add(previousRecord)
			console.log("RES", result)
			expect(result.success).toBe(true)
		})
	})

	describe("Getting one record", () => {
		it("should return the previously added record", async () => {
			if (previousRecord) {
				const result = await controller.findOne("id", previousRecord.id)
				expect(result.success).toBe(true)
			}
		})
	})

	describe("Modify one record", () => {
		it("should modify the existing record", async () => {
			if (previousRecord) {
				previousRecord.finished = true
				const modResult: Body = await controller.modify(
					previousRecord.id,
					previousRecord,
				)
				const result: Body = await controller.findOne(
					"id",
					previousRecord.id,
				)
				expect(modResult.success).toBe(true)
				expect(result.success).toBe(true)
			}
		})
	})

	describe("Deleting one record", () => {
		it("should result to a empty database", async () => {
			if (previousRecord) {
				const result = await controller.remove(previousRecord.id)
				expect(result.success).toBe(true)
			}
		})
	})
})
