import { toIndexName, toTableName } from 'db/migrate/utils/index';
import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

const tableName = 'users';
const columnName = 'deleted_at';
const isUnique = false;

const indexName = toIndexName(tableName, columnName);
const fullyQualifiedTableName = toTableName(tableName);

export class createTableUsersIndexDeletedAt1578562150637
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const index = new TableIndex({
      columnNames: [columnName],
      isUnique,
      name: indexName,
    });

    await queryRunner.createIndex(fullyQualifiedTableName, index);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex(fullyQualifiedTableName, indexName);
  }
}
