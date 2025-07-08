import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCareLogTables1710000000000 implements MigrationInterface {
  name = 'InitCareLogTables1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`diaper_change\` (
        \`diaper_change_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`change_type\` varchar(6) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`poo_texture\` varchar(20) NULL,
        \`poo_color\` varchar(10) NULL,
        \`photo_url\` text NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) DEFAULT 0,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_diaper_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`),
        CONSTRAINT \`FK_diaper_person\` FOREIGN KEY (\`person_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_diaper_baby_time\` ON \`${schema}\`.\`diaper_change\` (\`baby_id\`, \`event_time\`)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_diaper_person_created\` ON \`${schema}\`.\`diaper_change\` (\`person_id\`, \`created_at\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`medication_administration\` (
        \`med_admin_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`baby_medication_id\` char(36) NULL,
        \`medication_name\` varchar(100) NULL,
        \`dosage\` float NOT NULL,
        \`unit\` varchar(10) NOT NULL,
        \`route\` varchar(50) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`photo_url\` text NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) DEFAULT 0,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_med_admin_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`),
        CONSTRAINT \`FK_med_admin_person\` FOREIGN KEY (\`person_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_med_admin_baby_time\` ON \`${schema}\`.\`medication_administration\` (\`baby_id\`, \`event_time\`)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_med_admin_person_created\` ON \`${schema}\`.\`medication_administration\` (\`person_id\`, \`created_at\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`temperature_measurement\` (
        \`temp_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`temperature\` float NOT NULL,
        \`unit\` varchar(1) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) DEFAULT 0,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_temp_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`),
        CONSTRAINT \`FK_temp_person\` FOREIGN KEY (\`person_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_temp_baby_time\` ON \`${schema}\`.\`temperature_measurement\` (\`baby_id\`, \`event_time\`)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_temp_person_created\` ON \`${schema}\`.\`temperature_measurement\` (\`person_id\`, \`created_at\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`symptom_report\` (
        \`symptom_id\` char(36) PRIMARY KEY,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`symptom_type\` varchar(50) NOT NULL,
        \`severity\` varchar(10) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) DEFAULT 0,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL,
        CONSTRAINT \`FK_symptom_baby\` FOREIGN KEY (\`baby_id\`) REFERENCES \`${schema}\`.\`baby\`(\`baby_id\`),
        CONSTRAINT \`FK_symptom_person\` FOREIGN KEY (\`person_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_symptom_baby_time\` ON \`${schema}\`.\`symptom_report\` (\`baby_id\`, \`event_time\`)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_symptom_person_created\` ON \`${schema}\`.\`symptom_report\` (\`person_id\`, \`created_at\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_diaper_change\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`diaper_change_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`change_type\` varchar(6) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`poo_texture\` varchar(20) NULL,
        \`poo_color\` varchar(10) NULL,
        \`photo_url\` text NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_diaper\` ON \`${schema}\`.\`ztracking_diaper_change\` (\`diaper_change_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_medication_administration\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`med_admin_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`baby_medication_id\` char(36) NULL,
        \`medication_name\` varchar(100) NULL,
        \`dosage\` float NOT NULL,
        \`unit\` varchar(10) NOT NULL,
        \`route\` varchar(50) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`photo_url\` text NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_med_admin\` ON \`${schema}\`.\`ztracking_medication_administration\` (\`med_admin_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_temperature_measurement\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`temp_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`temperature\` float NOT NULL,
        \`unit\` varchar(1) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_temp\` ON \`${schema}\`.\`ztracking_temperature_measurement\` (\`temp_id\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ztracking_symptom_report\` (
        \`ztracking_version\` char(36) PRIMARY KEY,
        \`symptom_id\` char(36) NOT NULL,
        \`baby_id\` char(36) NOT NULL,
        \`person_id\` char(36) NOT NULL,
        \`symptom_type\` varchar(50) NOT NULL,
        \`severity\` varchar(10) NOT NULL,
        \`event_time\` timestamp NOT NULL,
        \`notes\` text NULL,
        \`is_deleted\` tinyint(1) NULL,
        \`created_at\` timestamp NULL,
        \`updated_at\` timestamp NULL,
        \`deleted_at\` timestamp NULL,
        \`version_date\` timestamp NOT NULL
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ztrack_symptom\` ON \`${schema}\`.\`ztracking_symptom_report\` (\`symptom_id\`)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_symptom_report\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_temperature_measurement\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_medication_administration\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ztracking_diaper_change\``);
    await queryRunner.query(`DROP INDEX \`IDX_symptom_person_created\` ON \`${schema}\`.\`symptom_report\``);
    await queryRunner.query(`DROP INDEX \`IDX_symptom_baby_time\` ON \`${schema}\`.\`symptom_report\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`symptom_report\``);
    await queryRunner.query(`DROP INDEX \`IDX_temp_person_created\` ON \`${schema}\`.\`temperature_measurement\``);
    await queryRunner.query(`DROP INDEX \`IDX_temp_baby_time\` ON \`${schema}\`.\`temperature_measurement\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`temperature_measurement\``);
    await queryRunner.query(`DROP INDEX \`IDX_med_admin_person_created\` ON \`${schema}\`.\`medication_administration\``);
    await queryRunner.query(`DROP INDEX \`IDX_med_admin_baby_time\` ON \`${schema}\`.\`medication_administration\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`medication_administration\``);
    await queryRunner.query(`DROP INDEX \`IDX_diaper_person_created\` ON \`${schema}\`.\`diaper_change\``);
    await queryRunner.query(`DROP INDEX \`IDX_diaper_baby_time\` ON \`${schema}\`.\`diaper_change\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`diaper_change\``);
  }
}
