import { MigrationInterface, QueryRunner } from 'typeorm';

const { DB_SCHEMA: schema } = process.env;

export class createTableUsers1578454219812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE ${schema}.users (
        id varchar NOT NULL,
        username varchar NOT NULL,
        email varchar NOT NULL,
        password_hash varchar NOT NULL,
        token_version int4 NOT NULL DEFAULT 0,
        created_at timestamp NOT NULL DEFAULT now(),
        "role" ${schema}.users_role_enum NOT NULL DEFAULT 'USER'::${schema}.users_role_enum,
        deleted_at timestamp NULL,
        deleted_by varchar NULL,
        CONSTRAINT "pk_users_id" PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE ${schema}.users;
    `);
  }
}
