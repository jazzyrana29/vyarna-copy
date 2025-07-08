import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSleepTables1710000001000 implements MigrationInterface {
  name = 'InitSleepTables1710000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_session\` (
        \`session_id\` char(36) PRIMARY KEY,
        \`person_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`type\` varchar(10) NOT NULL,
        \`status\` varchar(12) NOT NULL,
        \`start_time\` timestamp NOT NULL,
        \`end_time\` timestamp NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_sleep_session_person\` FOREIGN KEY (\`person_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`),
        CONSTRAINT \`FK_sleep_session_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_sleep_session_start\` ON \`${schema}\`.\`sleep_session\` (\`baby_id\`, \`start_time\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_event\` (
        \`event_id\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`event_type\` varchar(10) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_sleep_event_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`sleep_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_sleep_event_time\` ON \`${schema}\`.\`sleep_event\` (\`session_id\`, \`event_time\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_interruption_reason\` (
        \`reason_id\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`reason_type\` varchar(20) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_sleep_reason_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`sleep_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_sleep_reason_time\` ON \`${schema}\`.\`sleep_interruption_reason\` (\`session_id\`, \`event_time\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_environment\` (
        \`env_id\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`temperature_c\` decimal(4,1) NULL,
        \`humidity_pct\` decimal(5,2) NULL,
        \`noise_db\` int NULL,
        \`light_level\` int NULL,
        \`recorded_at\` timestamp NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_sleep_env_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`sleep_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_sleep_env_record\` ON \`${schema}\`.\`sleep_environment\` (\`session_id\`, \`recorded_at\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_rating\` (
        \`rating_id\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`rating_type\` varchar(10) NOT NULL,
        \`rating_value\` int NOT NULL,
        \`rating_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_sleep_rating_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`sleep_session\`(\`session_id\`),
        CONSTRAINT \`FK_sleep_rating_person\` FOREIGN KEY (\`person_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_sleep_rating_time\` ON \`${schema}\`.\`sleep_rating\` (\`session_id\`, \`rating_time\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_schedule\` (
        \`schedule_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`day_of_week\` int NOT NULL,
        \`window_start\` time NOT NULL,
        \`window_end\` time NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_sleep_schedule_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_sleep_schedule_baby\` ON \`${schema}\`.\`sleep_schedule\` (\`baby_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_notification\` (
        \`notification_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`session_id\` char(36) NULL,
        \`channel\` varchar(10) NOT NULL,
        \`scheduled_for\` timestamp NOT NULL,
        \`sent_at\` timestamp NULL,
        \`status\` varchar(10) NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_sleep_notification_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`),
        CONSTRAINT \`FK_sleep_notification_person\` FOREIGN KEY (\`person_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`),
        CONSTRAINT \`FK_sleep_notification_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`sleep_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_summary\` (
        \`session_id\` char(36) PRIMARY KEY,
        \`total_sleep_secs\` int NOT NULL,
        \`total_interruptions\` int NOT NULL,
        \`avg_interruption_secs\` int NOT NULL,
        \`longest_block_secs\` int NOT NULL,
        \`sleep_efficiency\` float NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_sleep_summary_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`${schema}\`.\`sleep_session\`(\`session_id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`sleep_pattern_summary\` (
        \`summary_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`period_type\` varchar(10) NOT NULL,
        \`period_start\` date NOT NULL,
        \`avg_duration_s\` int NOT NULL,
        \`avg_interruptions\` float NOT NULL,
        \`sleep_efficiency\` float NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_sleep_pattern_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_sleep_pattern_period\` ON \`${schema}\`.\`sleep_pattern_summary\` (\`baby_id\`, \`period_type\`, \`period_start\`)`
    );

    /* ZTRACKING TABLES */
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_session\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`type\` varchar(10) NOT NULL,
        \`status\` varchar(12) NOT NULL,
        \`start_time\` timestamp NOT NULL,
        \`end_time\` timestamp NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_session\` ON \`${schema}\`.\`ztracking_sleep_session\` (\`session_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_event\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`event_id\` char(36) NOT NULL,
        \`session_id\` char(36) NOT NULL,
        \`event_type\` varchar(10) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_event\` ON \`${schema}\`.\`ztracking_sleep_event\` (\`event_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_interruption_reason\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`reason_id\` char(36) NOT NULL,
        \`session_id\` char(36) NOT NULL,
        \`reason_type\` varchar(20) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_reason\` ON \`${schema}\`.\`ztracking_sleep_interruption_reason\` (\`reason_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_environment\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`env_id\` char(36) NOT NULL,
        \`session_id\` char(36) NOT NULL,
        \`temperature_c\` decimal(4,1) NULL,
        \`humidity_pct\` decimal(5,2) NULL,
        \`noise_db\` int NULL,
        \`light_level\` int NULL,
        \`recorded_at\` timestamp NOT NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_env\` ON \`${schema}\`.\`ztracking_sleep_environment\` (\`env_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_rating\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`rating_id\` char(36) NOT NULL,
        \`session_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`rating_type\` varchar(10) NOT NULL,
        \`rating_value\` int NOT NULL,
        \`rating_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_rating\` ON \`${schema}\`.\`ztracking_sleep_rating\` (\`rating_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_schedule\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`schedule_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`day_of_week\` int NOT NULL,
        \`window_start\` time NOT NULL,
        \`window_end\` time NOT NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_schedule\` ON \`${schema}\`.\`ztracking_sleep_schedule\` (\`schedule_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_notification\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`notification_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`session_id\` char(36) NULL,
        \`channel\` varchar(10) NOT NULL,
        \`scheduled_for\` timestamp NOT NULL,
        \`sent_at\` timestamp NULL,
        \`status\` varchar(10) NOT NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_notification\` ON \`${schema}\`.\`ztracking_sleep_notification\` (\`notification_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_summary\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`session_id\` char(36) NOT NULL,
        \`total_sleep_secs\` int NOT NULL,
        \`total_interruptions\` int NOT NULL,
        \`avg_interruption_secs\` int NOT NULL,
        \`longest_block_secs\` int NOT NULL,
        \`sleep_efficiency\` float NOT NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_summary\` ON \`${schema}\`.\`ztracking_sleep_summary\` (\`session_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_sleep_pattern_summary\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`summary_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`period_type\` varchar(10) NOT NULL,
        \`period_start\` date NOT NULL,
        \`avg_duration_s\` int NOT NULL,
        \`avg_interruptions\` float NOT NULL,
        \`sleep_efficiency\` float NOT NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_sleep_pattern\` ON \`${schema}\`.\`ztracking_sleep_pattern_summary\` (\`summary_id\`)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_pattern_summary\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_summary\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_notification\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_schedule\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_rating\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_environment\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_interruption_reason\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_sleep_session\``);
    await queryRunner.query(`DROP INDEX \`IDX_sleep_pattern_period\` ON \`${schema}\`.\`sleep_pattern_summary\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_pattern_summary\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_summary\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_notification\``);
    await queryRunner.query(`DROP INDEX \`IDX_sleep_schedule_baby\` ON \`${schema}\`.\`sleep_schedule\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_schedule\``);
    await queryRunner.query(`DROP INDEX \`IDX_sleep_rating_time\` ON \`${schema}\`.\`sleep_rating\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_rating\``);
    await queryRunner.query(`DROP INDEX \`IDX_sleep_env_record\` ON \`${schema}\`.\`sleep_environment\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_environment\``);
    await queryRunner.query(`DROP INDEX \`IDX_sleep_reason_time\` ON \`${schema}\`.\`sleep_interruption_reason\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_interruption_reason\``);
    await queryRunner.query(`DROP INDEX \`IDX_sleep_event_time\` ON \`${schema}\`.\`sleep_event\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_event\``);
    await queryRunner.query(`DROP INDEX \`IDX_sleep_session_start\` ON \`${schema}\`.\`sleep_session\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`sleep_session\``);
  }
}
