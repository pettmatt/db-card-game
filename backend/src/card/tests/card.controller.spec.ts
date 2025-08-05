import { Test, TestingModule } from "@nestjs/testing"
import { CardController } from "../card.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CardService } from "../card.service"
import { Card } from "../card.entity"
import { Body } from "../card.service"

describe("CardService + CardController", () => {
	let service: CardService
	let controller: CardController
	let previousRecord: Card

	beforeEach(async () => {
		const db = TypeOrmModule.forRoot({
			type: "mysql",
			host: "127.0.0.1",
			port: 13306,
			username: "root",
			password: "root",
			database: "gamedb",
			entities: [Card],
			synchronize: true,
		})

		const module: TestingModule = await Test.createTestingModule({
			imports: [db, TypeOrmModule.forFeature([Card])],
			providers: [CardService],
			controllers: [CardController],
		}).compile()

		service = module.get<CardService>(CardService)
		controller = module.get<CardController>(CardController)
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
		it("should reutrn the record when added", async () => {
			const card: Card = new Card()
			previousRecord = card
			const result = await controller.add(previousRecord)
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
				previousRecord.markedToBeDestroyed = true
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
