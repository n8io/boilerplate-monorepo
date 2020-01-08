import { MigrationInterface, QueryRunner } from 'typeorm';

const { DB_SCHEMA: schema } = process.env;

export class createIndexesUsersEmailUsername1578454295736
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE UNIQUE INDEX "idx_users_email" ON ${schema}.users USING btree (email);
      CREATE UNIQUE INDEX "idx_users_username" ON ${schema}.users USING btree (username);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP INDEX ${schema}."idx_users_username";
      DROP INDEX ${schema}."idx_users_email";
    `);
  }
}
