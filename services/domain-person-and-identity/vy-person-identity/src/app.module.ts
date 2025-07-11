import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import typeorm from "./config/typeorm/typeorm";
import { CFG_TOKEN_TYPEORM } from "./config/config.tokens";
import { getLoggerConfig } from "./utils/common";
import { ensureDatabaseExists } from "./utils/db-init";
import { LogStreamLevel } from "ez-logger";
import { PersonModule } from "./modules/person/person.module";
import { EmailModule } from "./modules/email/email.module";
import { VerificationModule } from "./modules/verification/verification.module";
import { ContactModule } from "./modules/contact/contact.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const cfg = await configService.get(CFG_TOKEN_TYPEORM);
        await ensureDatabaseExists({
          host: cfg.host,
          port: cfg.port,
          user: cfg.username,
          password: cfg.password,
          database: cfg.database,
          ssl: cfg.ssl,
        });
        return cfg;
      },
    }),
    PersonModule,
    EmailModule,
    ContactModule,
    VerificationModule,
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
