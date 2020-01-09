import { toEnumName, toPrimaryIndexName, toTableName } from 'db/migrate/utils';
import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'users';

const fullyQualifiedEnumName = toEnumName(tableName, 'role');
const fullyQualifedTableName = toTableName(tableName);
const primaryKeyName = toPrimaryIndexName(tableName, 'id');

export class createTableUsers1578454219812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE ${fullyQualifedTableName} (
        id varchar NOT NULL,
        username varchar NOT NULL,
        email varchar NOT NULL,
        password_hash varchar NOT NULL,
        token_version int4 NOT NULL DEFAULT 0,
        created_at timestamp NOT NULL DEFAULT now(),
        role ${fullyQualifiedEnumName} NOT NULL DEFAULT 'USER'::${fullyQualifiedEnumName},
        deleted_at timestamp NULL,
        deleted_by varchar NULL,
        CONSTRAINT ${primaryKeyName} PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(fullyQualifedTableName);
  }
}
