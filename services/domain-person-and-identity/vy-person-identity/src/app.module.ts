import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import typeorm from "./config/typeorm/typeorm";
import { CFG_TOKEN_TYPEORM } from "./config/config.tokens";
import { getLoggerConfig } from "./utils/common";
import { LogStreamLevel } from "ez-logger";
import { PersonModule } from "./modules/person/person.module";
import { EmailModule } from "./modules/email/email.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await configService.get(CFG_TOKEN_TYPEORM);
      },
    }),
    PersonModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  private logger = getLoggerConfig(AppModule.name);
  constructor() {
    this.logger.debug(
      `${AppModule.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
}
