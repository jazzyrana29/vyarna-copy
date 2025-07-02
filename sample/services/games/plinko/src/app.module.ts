import { Module } from "@nestjs/common";
import { LogStreamLevel } from "ez-logger";
import { getLoggerConfig } from "./utils/common";
import { PlinkoModule } from "./modules/plinko/plinko.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CFG_TOKEN_TYPEORM } from "./config/config.tokens";
import typeorm from "./config/typeorm/typeorm";

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
    PlinkoModule,
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
