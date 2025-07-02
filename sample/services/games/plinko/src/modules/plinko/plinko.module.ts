import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlinkoKafkaService } from "./services/plinko-kafka.service";
import { PlinkoService } from "./services/plinko.service";
import { PlinkoController } from "./plinko.controller";
import { PlinkoGame } from "../../entities/plinko-game.entity";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([PlinkoGame])],
  providers: [PlinkoKafkaService, PlinkoService],
  controllers: [PlinkoController],
})
export class PlinkoModule {
  private logger = getLoggerConfig(PlinkoModule.name);

  constructor() {
    this.logger.debug(
      `${PlinkoModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
