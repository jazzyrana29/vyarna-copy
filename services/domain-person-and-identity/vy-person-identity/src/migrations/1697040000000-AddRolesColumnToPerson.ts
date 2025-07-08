import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesColumnToPerson1697040000000 implements MigrationInterface {
  name = 'AddRolesColumnToPerson1697040000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" ADD COLUMN "roles" text[]`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "roles"`);
  }
}
