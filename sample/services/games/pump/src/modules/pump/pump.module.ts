import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PumpGame } from "../../entities/pump-game.entity";
import { PumpService } from "./services/pump.service";
import { PumpKafkaService } from "./services/pump-kafka.service";
import { RNGService } from "./services/rng.service";
import { PayoutService } from "./services/payout.service";
import { PumpController } from "./pump.controller";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([PumpGame])],
  controllers: [PumpController],
  providers: [PumpService, PumpKafkaService, RNGService, PayoutService],
})
export class PumpModule {
  private logger = getLoggerConfig(PumpModule.name);

  constructor() {
    this.logger.debug(
      `${PumpModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
