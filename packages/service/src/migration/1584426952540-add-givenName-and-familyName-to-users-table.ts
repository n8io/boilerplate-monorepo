import { MigrationInterface, QueryRunner } from "typeorm";
import { toTableName } from 'db/migrate/utils';

const tableName = 'users';
const givenNameColumnName = 'given_name';
const familyNameColumnName = 'family_name';

const fullyQualifiedTableName = toTableName(tableName);

export class addGivenNameAndFamilyNameToUsersTable1584426952540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE ${fullyQualifiedTableName} ADD COLUMN ${givenNameColumnName} VARCHAR NULL;
      ALTER TABLE ${fullyQualifiedTableName} ADD COLUMN ${familyNameColumnName} VARCHAR NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE ${fullyQualifiedTableName} DROP COLUMN ${givenNameColumnName};
      ALTER TABLE ${fullyQualifiedTableName} DROP COLUMN ${familyNameColumnName};
    `);
  }
}
