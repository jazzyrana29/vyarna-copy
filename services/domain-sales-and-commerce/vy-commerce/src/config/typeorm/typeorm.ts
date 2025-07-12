import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { CFG_TOKEN_TYPEORM } from "../config.tokens";
import * as fs from "fs";

dotenvConfig({ path: ".env" });

const config = {
  type: "mysql",
  host: process.env.TIDB_HOST || "127.0.0.1",
  port: process.env.TIDB_PORT ? Number(process.env.TIDB_PORT) : 4000,
  username: process.env.TIDB_USER || "root",
  password: process.env.TIDB_PASSWORD || "",
  database: process.env.TIDB_DATABASE || "test",
  ssl:
    process.env.TIDB_ENABLE_SSL === "true"
      ? {
          minVersion: "TLSv1.2",
          ca: process.env.TIDB_CA_PATH
            ? fs.readFileSync(process.env.TIDB_CA_PATH)
            : undefined,
        }
      : null,
  synchronize: process.env.NODE_ENV === "development",
  logging: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  extra: {
    connectionLimit: 10, // Pool size for MySQL connections
    waitForConnections: true, // Prevent excessive connection failures
    queueLimit: 0, // No limit on queueing pending connections
    keepAliveInitialDelay: 10000, // Keep connection alive every 10s
    enableKeepAlive: true, // Prevent disconnections
  },
};

export default registerAs(CFG_TOKEN_TYPEORM, () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
