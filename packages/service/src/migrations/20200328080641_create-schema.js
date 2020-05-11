import { Db } from 'types/db';

const up = (knex) => knex.raw(`CREATE SCHEMA IF NOT EXISTS ${Db.Schema.MAIN}`);
const down = (knex) => knex.raw(`DROP SCHEMA IF EXISTS ${Db.Schema.MAIN}`);

export { down, up };
