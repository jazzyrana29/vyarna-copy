import * as mysql from 'mysql2/promise';

export interface DbInitOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl?: object | null;
}

export async function ensureDatabaseExists(opts: DbInitOptions): Promise<void> {
  const { host, port, user, password, database, ssl } = opts;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    ssl,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await connection.end();
}
