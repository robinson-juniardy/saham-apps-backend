import Database from "../core/legato/Database";
export const Postgres = new Database({
  provider: "pgsql",
  options: {
    host: "localhost",
    user: "postgres",
    password: "1nd0n3s1a!#",
    database: "db_saham",
    port: 5432,
  },
});
