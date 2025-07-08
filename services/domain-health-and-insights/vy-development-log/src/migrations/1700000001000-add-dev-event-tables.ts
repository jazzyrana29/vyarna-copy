import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDevEventTables1700000001000 implements MigrationInterface {
  name = 'AddDevEventTables1700000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`milestone\` (
        \`milestone_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`milestone_type\` varchar(30) NOT NULL,
        \`description\` text NULL,
        \`achieved_at\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) DEFAULT 0,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`CREATE INDEX \`IDX_milestone_baby\` ON \`${schema}\`.\`milestone\` (\`baby_id\`)`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_milestone\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`milestone_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`milestone_type\` varchar(30) NOT NULL,
        \`description\` text NULL,
        \`achieved_at\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) NULL,
        \`created_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`CREATE INDEX \`IDX_ztracking_milestone\` ON \`${schema}\`.\`ztracking_milestone\` (\`milestone_id\`)`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`teething_event\` (
        \`teething_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`tooth_name\` varchar(50) NOT NULL,
        \`eruption_date\` date NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) DEFAULT 0,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`CREATE INDEX \`IDX_teething_baby\` ON \`${schema}\`.\`teething_event\` (\`baby_id\`)`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_teething_event\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`teething_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`tooth_name\` varchar(50) NOT NULL,
        \`eruption_date\` date NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) NULL,
        \`created_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`CREATE INDEX \`IDX_ztracking_teething\` ON \`${schema}\`.\`ztracking_teething_event\` (\`teething_id\`)`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`development_moment\` (
        \`moment_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`title\` varchar(100) NOT NULL,
        \`description\` text NULL,
        \`photo_url\` text NULL,
        \`timestamp\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) DEFAULT 0,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`CREATE INDEX \`IDX_dev_moment_baby\` ON \`${schema}\`.\`development_moment\` (\`baby_id\`)`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_development_moment\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`moment_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`title\` varchar(100) NOT NULL,
        \`description\` text NULL,
        \`photo_url\` text NULL,
        \`timestamp\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) NULL,
        \`created_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`CREATE INDEX \`IDX_ztracking_dev_moment\` ON \`${schema}\`.\`ztracking_development_moment\` (\`moment_id\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_development_moment\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`development_moment\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_teething_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`teething_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_milestone\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`milestone\``);
  }
}
