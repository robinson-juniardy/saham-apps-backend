import { loadEntities } from "../core/typeorm";
import { DataSource } from "typeorm";

const Entities = loadEntities(process.cwd() + "/src/entities");

export const PostgresORM = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "",
  password: "",
  database: "",
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

/**
 * uncomment init below for testing connection
 * change PostgresORM init and choose your connection data source object if not using Postgres
 */

// PostgresORM.initialize()
//   .then(() => {
//     console.log("data source has been initialized!");
//   })
//   .catch((error) => {
//     console.error("Error during Data Source initialization", error);
//   });
