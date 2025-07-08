import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWalletLedgerTables1690000000000 implements MigrationInterface {
  name = 'CreateWalletLedgerTables1690000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`ledger_transaction\` (
        \`transaction_id\` char(36) PRIMARY KEY,
        \`account_id\` char(36) NOT NULL,
        \`amount_cents\` bigint NOT NULL,
        \`transaction_type\` varchar(20) NOT NULL,
        \`related_type\` varchar(30) NULL,
        \`related_id\` char(36) NULL,
        \`description\` text NULL,
        \`status\` varchar(10) NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_ledger_account\` FOREIGN KEY (\`account_id\`) REFERENCES \`${schema}\`.\`wallet_account\`(\`account_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ledger_account_created\` ON \`${schema}\`.\`ledger_transaction\` (\`account_id\`, \`created_at\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`provider_payout\` (
        \`payout_id\` char(36) PRIMARY KEY,
        \`provider_id\` char(36) NOT NULL,
        \`account_id\` char(36) NOT NULL,
        \`period_start\` date NOT NULL,
        \`period_end\` date NOT NULL,
        \`amount_cents\` bigint NOT NULL,
        \`status\` varchar(20) NOT NULL,
        \`scheduled_at\` timestamp NOT NULL,
        \`paid_at\` timestamp NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_payout_account\` FOREIGN KEY (\`account_id\`) REFERENCES \`${schema}\`.\`wallet_account\`(\`account_id\`),
        CONSTRAINT \`FK_payout_provider\` FOREIGN KEY (\`provider_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_provider_period\` ON \`${schema}\`.\`provider_payout\` (\`provider_id\`, \`period_start\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`consumer_reward\` (
        \`reward_id\` char(36) PRIMARY KEY,
        \`consumer_id\` char(36) NOT NULL,
        \`account_id\` char(36) NOT NULL,
        \`source_type\` varchar(20) NOT NULL,
        \`source_id\` char(36) NOT NULL,
        \`amount_cents\` bigint NOT NULL,
        \`status\` varchar(20) NOT NULL,
        \`issued_at\` timestamp NOT NULL,
        \`redeemed_at\` timestamp NULL,
        \`expired_at\` timestamp NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_reward_account\` FOREIGN KEY (\`account_id\`) REFERENCES \`${schema}\`.\`wallet_account\`(\`account_id\`),
        CONSTRAINT \`FK_reward_consumer\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`${schema}\`.\`person\`(\`person_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_consumer_status\` ON \`${schema}\`.\`consumer_reward\` (\`consumer_id\`, \`status\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`affiliate_commission\` (
        \`commission_id\` char(36) PRIMARY KEY,
        \`partner_id\` char(36) NOT NULL,
        \`account_id\` char(36) NOT NULL,
        \`order_id\` char(36) NOT NULL,
        \`amount_cents\` bigint NOT NULL,
        \`status\` varchar(20) NOT NULL,
        \`earned_at\` timestamp NOT NULL,
        \`paid_at\` timestamp NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_commission_account\` FOREIGN KEY (\`account_id\`) REFERENCES \`${schema}\`.\`wallet_account\`(\`account_id\`),
        CONSTRAINT \`FK_commission_partner\` FOREIGN KEY (\`partner_id\`) REFERENCES \`${schema}\`.\`affiliate_partner\`(\`partner_id\`),
        CONSTRAINT \`FK_commission_order\` FOREIGN KEY (\`order_id\`) REFERENCES \`${schema}\`.\`order\`(\`order_id\`)
      ) ENGINE=InnoDB;
    `);
    await queryRunner.query(
      `CREATE INDEX \`IDX_partner_status\` ON \`${schema}\`.\`affiliate_commission\` (\`partner_id\`, \`status\`)`
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`${schema}\`.\`internal_charge\` (
        \`charge_id\` char(36) PRIMARY KEY,
        \`account_id\` char(36) NOT NULL,
        \`amount_cents\` bigint NOT NULL,
        \`description\` text NOT NULL,
        \`charge_time\` timestamp NOT NULL,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`FK_charge_account\` FOREIGN KEY (\`account_id\`) REFERENCES \`${schema}\`.\`wallet_account\`(\`account_id\`)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`internal_charge\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`affiliate_commission\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`consumer_reward\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`provider_payout\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`${schema}\`.\`ledger_transaction\``);
  }
}
