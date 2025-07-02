import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CrashRound } from "../../entities/crash-round.entity";
import { CrashService } from "./services/crash.service";
import { CrashKafkaService } from "./services/crash-kafka.service";
import { CrashController } from "./crash.controller";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([CrashRound])],
  controllers: [CrashController],
  providers: [CrashService, CrashKafkaService],
})
export class CrashModule {
  private logger = getLoggerConfig(CrashModule.name);

  constructor() {
    this.logger.debug(
      `${CrashModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
