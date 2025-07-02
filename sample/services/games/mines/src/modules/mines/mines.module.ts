import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinesGame } from "../../entities/mines-game.entity";
import { MinesService } from "./services/mines.service";
import { MinesKafkaService } from "./services/mines-kafka.service";
import { MinesController } from "./mines.controller";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([MinesGame])],
  controllers: [MinesController],
  providers: [MinesService, MinesKafkaService],
})
export class MinesModule {
  private logger = getLoggerConfig(MinesModule.name);

  constructor() {
    this.logger.debug(
      `${MinesModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
