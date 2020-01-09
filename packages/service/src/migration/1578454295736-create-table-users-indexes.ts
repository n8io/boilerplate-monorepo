import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';
import { toTableName, toIndexName } from 'db/migrate/utils';

const tableName = 'users';
const emailColumnName = 'email';
const usernameColumnName = 'username';

const fullyQualifiedTableName = toTableName(tableName);
const emailIndexName = toIndexName(tableName, emailColumnName);
const usernameIndexName = toIndexName(tableName, usernameColumnName);

export class createIndexesUsersIndexes1578454295736
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      fullyQualifiedTableName,
      new TableIndex({
        columnNames: [emailColumnName],
        isUnique: true,
        name: emailIndexName,
      })
    );

    await queryRunner.createIndex(
      fullyQualifiedTableName,
      new TableIndex({
        columnNames: [usernameColumnName],
        isUnique: true,
        name: usernameIndexName,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex(fullyQualifiedTableName, emailIndexName);
    await queryRunner.dropIndex(fullyQualifiedTableName, usernameIndexName);
  }
}
