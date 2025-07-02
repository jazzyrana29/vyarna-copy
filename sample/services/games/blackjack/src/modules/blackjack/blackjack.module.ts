import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlackjackController } from "./blackjack.controller";
import { BlackjackKafkaService } from "./services/blackjack-kafka.service";
import { BlackjackService } from "./services/blackjack.service";
import { BlackjackGameEntity } from "src/entities/blackjack-game.entity";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([BlackjackGameEntity])],
  controllers: [BlackjackController],
  providers: [BlackjackService, BlackjackKafkaService],
})
export class BlackjackModule {
  private logger = getLoggerConfig(BlackjackModule.name);

  constructor() {
    this.logger.debug(
      `${BlackjackModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
