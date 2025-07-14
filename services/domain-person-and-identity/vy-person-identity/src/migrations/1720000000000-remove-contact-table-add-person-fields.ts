import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveContactTableAddPersonFields1720000000000 implements MigrationInterface {
  name = 'RemoveContactTableAddPersonFields1720000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`contact\``);
    await queryRunner.query(
      `ALTER TABLE \`${schema}\`.\`person\` ADD COLUMN \`stripeCustomerId\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`${schema}\`.\`person\` ADD COLUMN \`activeCampaignId\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_person_stripeCustomerId\` ON \`${schema}\`.\`person\` (\`stripeCustomerId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_person_activeCampaignId\` ON \`${schema}\`.\`person\` (\`activeCampaignId\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(
      `DROP INDEX \`IDX_person_activeCampaignId\` ON \`${schema}\`.\`person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_person_stripeCustomerId\` ON \`${schema}\`.\`person\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`${schema}\`.\`person\` DROP COLUMN \`activeCampaignId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`${schema}\`.\`person\` DROP COLUMN \`stripeCustomerId\``,
    );
    await queryRunner.query(`CREATE TABLE \`${schema}\`.\`contact\` (
      \`contactId\` char(36) PRIMARY KEY,
      \`firstName\` varchar(50) NOT NULL,
      \`lastName\` varchar(50) NOT NULL,
      \`email\` varchar(255) UNIQUE NOT NULL,
      \`stripeCustomerId\` varchar(255) NULL,
      \`activeCampaignId\` varchar(255) NULL,
      \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`);
    await queryRunner.query(
      `CREATE INDEX \`IDX_contact_contactId\` ON \`${schema}\`.\`contact\` (\`contactId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_contact_stripeCustomerId\` ON \`${schema}\`.\`contact\` (\`stripeCustomerId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_contact_activeCampaignId\` ON \`${schema}\`.\`contact\` (\`activeCampaignId\`)`,
    );
  }
}
