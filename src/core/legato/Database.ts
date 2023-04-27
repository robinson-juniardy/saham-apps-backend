import { TDatabaseConfiguration } from "./types/database.types";
import mssql, { IResult, pool } from "mssql";
import { Client, Pool, QueryResult } from "pg";
import mysql from "mysql2";

export default class Database {
  protected readonly __databaseConfig: TDatabaseConfiguration;

  public static bulkInsert<params extends any[]>(
    table: string,
    inputParams: params,
    fields: Array<string>
  ) {}

  constructor(private config: TDatabaseConfiguration) {
    this.__databaseConfig = config;
  }

  public async query(
    query: string,
    resultKey: keyof QueryResult | keyof IResult<any>,
    multiple: boolean = false,
    multipleParams?: any[]
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

        return new Promise((resolve, reject) => {
          connection.query(query, (error, results, fields) => {
            if (error) {
              console.log(error);
              reject(null);
            }
            resolve(results);
          });

          connection.end();
        });
    }
  }
}
