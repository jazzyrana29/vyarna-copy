import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FlipController } from "./flip.controller";
import { FlipKafkaService } from "./services/flip-kafka.service";
import { FlipService } from "./services/flip.service";
import { FlipSession } from "../../entities/flip-session.entity";
import { FlipRound } from "../../entities/flip-round.entity";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([FlipSession, FlipRound])],
  controllers: [FlipController],
  providers: [FlipService, FlipKafkaService],
})
export class FlipModule {
  private logger = getLoggerConfig(FlipModule.name);

  constructor() {
    this.logger.debug(
      `${FlipModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
