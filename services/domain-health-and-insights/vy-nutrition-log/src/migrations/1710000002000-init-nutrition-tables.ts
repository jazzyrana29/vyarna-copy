import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitNutritionTables1710000002000 implements MigrationInterface {
  name = 'InitNutritionTables1710000002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`nutrition_session\` (
        \`session_id\` char(36) PRIMARY KEY,
        \`milk_giver_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`type\` varchar(10) NOT NULL,
        \`status\` varchar(12) NOT NULL,
        \`started_at\` timestamp NOT NULL,
        \`ended_at\` timestamp NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_nutrition_session_giver\` FOREIGN KEY (\`milk_giver_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`),
        CONSTRAINT \`FK_nutrition_session_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_nutrition_session_start\` ON \`${schema}\`.\`nutrition_session\` (\`baby_id\`, \`started_at\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`breast_event\` (
        \`event_id\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`side\` varchar(10) NOT NULL,
        \`action\` varchar(10) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_breast_event_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`nutrition_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_breast_event_time\` ON \`${schema}\`.\`breast_event\` (\`session_id\`, \`event_time\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`bottle_event\` (
        \`event_id\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`action\` varchar(10) NOT NULL,
        \`content_type\` varchar(12) NOT NULL,
        \`volume_start_ml\` int NULL,
        \`volume_end_ml\` int NULL,
        \`event_time\` timestamp NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_bottle_event_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`nutrition_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_bottle_event_time\` ON \`${schema}\`.\`bottle_event\` (\`session_id\`, \`event_time\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`solids_event\` (
        \`event_id\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`food_ids\` text NULL,
        \`servings\` text NULL,
        \`reaction\` varchar(10) NULL,
        \`event_time\` timestamp NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_solids_event_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`nutrition_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_solids_event_time\` ON \`${schema}\`.\`solids_event\` (\`session_id\`, \`event_time\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`pumping_event\` (
        \`event_id\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`action\` varchar(15) NOT NULL,
        \`pump_type\` varchar(10) NULL,
        \`side\` varchar(10) NULL,
        \`volume_ml\` int NULL,
        \`bag_label\` varchar(100) NULL,
        \`storage_status\` varchar(15) NULL,
        \`expiration_date\` date NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_pumping_event_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`nutrition_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_pumping_event_time\` ON \`${schema}\`.\`pumping_event\` (\`session_id\`, \`event_time\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`session_summary\` (
        \`session_id\` char(36) PRIMARY KEY,
        \`duration_secs\` int NOT NULL,
        \`breast_intake_ml\` int NULL,
        \`bottle_formula_intake_ml\` int NULL,
        \`bottle_breastmilk_intake_ml\` int NULL,
        \`bottle_mixed_intake_ml\` int NULL,
        \`solids_summary\` text NULL,
        \`total_pumped_ml\` int NULL,
        \`breast_switch_count\` int NULL,
        \`events_count\` int NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_summary_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`nutrition_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);

    /* ZTRACKING TABLES */
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_nutrition_session\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`milk_giver_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`type\` varchar(10) NOT NULL,
        \`status\` varchar(12) NOT NULL,
        \`started_at\` timestamp NOT NULL,
        \`ended_at\` timestamp NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_nutrition_session\` ON \`${schema}\`.\`ztracking_nutrition_session\` (\`session_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_breast_event\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`event_id\` char(36) NOT NULL,
        \`session_id\` char(36) NOT NULL,
        \`side\` varchar(10) NOT NULL,
        \`action\` varchar(10) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`created_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_breast_event\` ON \`${schema}\`.\`ztracking_breast_event\` (\`event_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_bottle_event\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`event_id\` char(36) NOT NULL,
        \`session_id\` char(36) NOT NULL,
        \`action\` varchar(10) NOT NULL,
        \`content_type\` varchar(12) NOT NULL,
        \`volume_start_ml\` int NULL,
        \`volume_end_ml\` int NULL,
        \`event_time\` timestamp NOT NULL,
        \`created_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_bottle_event\` ON \`${schema}\`.\`ztracking_bottle_event\` (\`event_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_solids_event\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`event_id\` char(36) NOT NULL,
        \`session_id\` char(36) NOT NULL,
        \`food_ids\` text NULL,
        \`servings\` text NULL,
        \`reaction\` varchar(10) NULL,
        \`event_time\` timestamp NOT NULL,
        \`created_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_solids_event\` ON \`${schema}\`.\`ztracking_solids_event\` (\`event_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_pumping_event\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`event_id\` char(36) NOT NULL,
        \`session_id\` char(36) NOT NULL,
        \`action\` varchar(15) NOT NULL,
        \`pump_type\` varchar(10) NULL,
        \`side\` varchar(10) NULL,
        \`volume_ml\` int NULL,
        \`bag_label\` varchar(100) NULL,
        \`storage_status\` varchar(15) NULL,
        \`expiration_date\` date NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`created_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_pumping_event\` ON \`${schema}\`.\`ztracking_pumping_event\` (\`event_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_session_summary\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`duration_secs\` int NOT NULL,
        \`breast_intake_ml\` int NULL,
        \`bottle_formula_intake_ml\` int NULL,
        \`bottle_breastmilk_intake_ml\` int NULL,
        \`bottle_mixed_intake_ml\` int NULL,
        \`solids_summary\` text NULL,
        \`total_pumped_ml\` int NULL,
        \`breast_switch_count\` int NULL,
        \`events_count\` int NOT NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_session_summary\` ON \`${schema}\`.\`ztracking_session_summary\` (\`session_id\`)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_session_summary\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_pumping_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_solids_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_bottle_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_breast_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_nutrition_session\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`session_summary\``);
    await queryRunner.query(`DROP INDEX \`IDX_pumping_event_time\` ON \`${schema}\`.\`pumping_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`pumping_event\``);
    await queryRunner.query(`DROP INDEX \`IDX_solids_event_time\` ON \`${schema}\`.\`solids_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`solids_event\``);
    await queryRunner.query(`DROP INDEX \`IDX_bottle_event_time\` ON \`${schema}\`.\`bottle_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`bottle_event\``);
    await queryRunner.query(`DROP INDEX \`IDX_breast_event_time\` ON \`${schema}\`.\`breast_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`breast_event\``);
    await queryRunner.query(`DROP INDEX \`IDX_nutrition_session_start\` ON \`${schema}\`.\`nutrition_session\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`nutrition_session\``);
  }
}
