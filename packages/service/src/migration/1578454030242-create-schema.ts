import { MigrationInterface, QueryRunner } from 'typeorm';

const { DB_SCHEMA: schema } = process.env;

export class createSchema1578454030242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS ${schema};   
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      schema === 'public' ? 'SELECT 1;' : `DROP SCHEMA ${schema};`
    );
  }
}
