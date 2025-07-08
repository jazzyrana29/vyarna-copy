import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGrowthTables1700000000000 implements MigrationInterface {
  name = 'CreateGrowthTables1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`growth_measurement\` (
        \`growth_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`measurement_type\` varchar(30) NOT NULL,
        \`value\` float NOT NULL,
        \`unit\` varchar(10) NOT NULL,
        \`timestamp\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) DEFAULT 0,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`CREATE INDEX \`IDX_growth_baby\` ON \`${schema}\`.\`growth_measurement\` (\`baby_id\`)`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_growth_measurement\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`growth_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`measurement_type\` varchar(30) NOT NULL,
        \`value\` float NOT NULL,
        \`unit\` varchar(10) NOT NULL,
        \`timestamp\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) NULL,
        \`created_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`CREATE INDEX \`IDX_ztracking_growth\` ON \`${schema}\`.\`ztracking_growth_measurement\` (\`growth_id\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_growth_measurement\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`growth_measurement\``);
  }
}
