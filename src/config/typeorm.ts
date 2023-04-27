import { loadEntities } from "../core/typeorm";
import { DataSource } from "typeorm";
import { PerformConnection } from "../core/typeorm";

const Entities = loadEntities(process.cwd() + "/src/entities");

export const PostgresORM = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "1nd0n3s1a!#",
  database: "db_saham",
  synchronize: false,
  port: 5432,
  entities: Entities,
});

export const SQLServerORM = new DataSource({
  type: "mssql",
  host: "localhost",
  username: "",
  password: "",
  database: "",
  synchronize: false,
  pool: {
    max: 10,
    min: 0,
  },
  options: {
    encrypt: false,
  },
  entities: Entities,
});

export const MysqlORM = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "",
  password: "",
  database: "",
  port: 3306,
  synchronize: false,
  entities: Entities,
});

const connection = new PerformConnection(PostgresORM);
connection.connect();
