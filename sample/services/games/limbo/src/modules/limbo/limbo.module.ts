import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LimboGame } from "../../entities/limbo-game.entity";
import { LimboService } from "./services/limbo.service";
import { LimboKafkaService } from "./services/limbo-kafka.service";
import { LimboController } from "./limbo.controller";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([LimboGame])],
  controllers: [LimboController],
  providers: [LimboService, LimboKafkaService],
})
export class LimboModule {
  private logger = getLoggerConfig(LimboModule.name);

  constructor() {
    this.logger.debug(
      `${LimboModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
