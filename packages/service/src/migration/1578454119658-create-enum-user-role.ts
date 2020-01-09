import { MigrationInterface, QueryRunner } from 'typeorm';
import { toEnumName } from 'db/migrate/utils';

const tableName = 'users';
const enumName = 'role';
const fullyQualifiedEnumName = toEnumName(tableName, enumName);

export class createEnumUserRole1578454119658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TYPE ${fullyQualifiedEnumName} AS ENUM ('ADMIN','USER');   
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TYPE ${fullyQualifiedEnumName};
    `);
  }
}
