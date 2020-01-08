import { MigrationInterface, QueryRunner } from 'typeorm';

const { DB_SCHEMA: schema } = process.env;

export class createEnumUserRole1578454119658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TYPE ${schema}.users_role_enum AS ENUM ('ADMIN','USER');   
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TYPE ${schema}.users_role_enum;
    `);
  }
}
