import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomerExternalIdToPaymentIntent1710200000000
  implements MigrationInterface
{
  name = 'AddCustomerExternalIdToPaymentIntent1710200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(
      `ALTER TABLE \`${schema}\`.\`payment_intent\` ADD COLUMN \`customer_external_id\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.options.database;
    await queryRunner.query(
      `ALTER TABLE \`${schema}\`.\`payment_intent\` DROP COLUMN \`customer_external_id\``,
    );
  }
}
