import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DragonTowerController } from "./dragon-tower.controller";
import { DragonTowerKafkaService } from "./services/dragon-tower-kafka.service";
import { DragonTowerService } from "./services/dragon-tower.service";
import { DragonTowerGame } from "../../entities/dragon-tower-game.entity";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([DragonTowerGame])],
  controllers: [DragonTowerController],
  providers: [DragonTowerService, DragonTowerKafkaService],
})
export class DragonTowerModule {
  private logger = getLoggerConfig(DragonTowerModule.name);

  constructor() {
    this.logger.debug(
      `${DragonTowerModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
