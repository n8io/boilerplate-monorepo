module.exports = {
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  database: 'boilerplate-monorepo',
  entities: ['src/entity/**/*.ts'],
  host: 'localhost',
  logging: false,
  migrations: ['src/migration/**/*.ts'],
  password: 'postgres',
  port: 5432,
  subscribers: ['src/subscriber/**/*.ts'],
  synchronize: true,
  type: 'postgres',
  username: 'postgres',
};
