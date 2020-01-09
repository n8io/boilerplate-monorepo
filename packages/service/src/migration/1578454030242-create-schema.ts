import { MigrationInterface, QueryRunner } from 'typeorm';

const { DB_SCHEMA: schema } = process.env;

export class createSchema1578454030242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createSchema(schema!, true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    schema !== 'public' && (await queryRunner.dropSchema(schema!));
  }
}
