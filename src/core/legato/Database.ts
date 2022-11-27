import { TDatabaseConfiguration } from "./types/database.types";
import mssql, { IResult } from "mssql";
import { Pool, QueryResult } from "pg";
import mysql from "mysql";

export default class Database {
  protected readonly __databaseConfig: TDatabaseConfiguration;
  constructor(private config: TDatabaseConfiguration) {
    this.__databaseConfig = config;
  }

  public async query(
    query: string,
    resultKey: keyof QueryResult | keyof IResult<any>
  ) {
    switch (this.__databaseConfig.provider) {
      case "sqlserver":
        try {
          await mssql.connect(this.__databaseConfig.options);
          const result = await mssql.query(query);
          return result[resultKey as keyof IResult<any>];
        } catch (error) {
          console.log(error);
          return null;
        }
      case "pgsql":
        try {
          const result = await new Pool(this.__databaseConfig.options).query(
            query
          );
          return result[resultKey as keyof QueryResult];
        } catch (error) {
          console.error(error);
          return null;
        }
      case "mysql":
        const connection = mysql.createConnection(
          this.__databaseConfig.options
        );
        connection.connect();

        connection.query(query, (error, results, fields) => {
          if (error) console.log(error);
          return results;
        });

        connection.end();
    }
  }
}
