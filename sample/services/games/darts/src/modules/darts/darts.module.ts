import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DartsService } from "./services/darts.service";
import { DartsController } from "./darts.controller";
import { DartsKafkaService } from "./services/darts-kafka.service";
import { DartsGame } from "../../entities/darts-game.entity";
import { DartThrow } from "../../entities/dart-throw.entity";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([DartsGame, DartThrow])],
  controllers: [DartsController],
  providers: [DartsService, DartsKafkaService],
})
export class DartsModule {
  private logger = getLoggerConfig(DartsModule.name);

  constructor() {
    this.logger.debug(
      `${DartsModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
