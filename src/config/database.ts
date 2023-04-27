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

export const SqlServer = new Database({
  provider: "sqlserver",
  options: {
    server: "",
    user: "",
    password: "",
    database: "",
    parseJson: true,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  },
});

export const MySQL = new Database({
  provider: "mysql",
  options: {
    host: "localhost",
    user: "root",
    password: "",
    database: "",
    port: 3306,
  },
});
