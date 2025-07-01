import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "../../entities/person.entity";
import { PersonService } from "./services/person.service";
import { PersonKafkaService } from "./services/person-kafka.service";
import { PersonController } from "./person.controller";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService, PersonKafkaService],
})
export class PersonModule {
  private logger = getLoggerConfig(PersonModule.name);

  constructor() {
    this.logger.debug(
      `${PersonModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
