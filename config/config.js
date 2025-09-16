const host = process.env.POSTGRES_HOST;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;
const dialect = 'postgres';

module.exports = ['development', 'test', 'production'].reduce((acc, env) => {
  acc[env] = { username, password, database, host, dialect };
  return acc;
}, {});
