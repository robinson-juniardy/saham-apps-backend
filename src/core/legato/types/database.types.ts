import { IResult } from "mssql";
import { QueryResult } from "pg";

export type TMysqlProvider = {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
};

export type TSqlServerProvider = {
  user: string;
  password: string;
  database: string;
  server: string;
  parseJson?: boolean;
  pool?: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
  options?: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
};

export type TPgSQLProvider = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionString?: string; // e.g. postgres://user:password@host:5432/database
  ssl?: any; // passed directly to node.TLSSocket, supports all tls.connect options
  types?: any; // custom type parsers
  statement_timeout?: number; // number of milliseconds before a statement in query will time out, default is no timeout
  query_timeout?: number; // number of milliseconds before a query call will timeout, default is no timeout
  application_name?: string; // The name of the application that created this Client instance
  connectionTimeoutMillis?: number; // number of milliseconds to wait for connection, default is no timeout
  idle_in_transaction_session_timeout?: number;
};

export type TMongooseProvider = {
  connectionString: string;
  options?: {
    autoIndex: boolean;
    maxPoolSize: number;
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
    family: number;
  };
};

export type SqlServerContext = IResult<any>;
export type PostgreeContext = QueryResult;

export type TDatabaseConfiguration =
  | {
      provider: "sqlserver";
      options: TSqlServerProvider;
    }
  | {
      provider: "pgsql";
      options: TPgSQLProvider;
    }
  | {
      provider: "mysql";
      options: TMysqlProvider;
    }
  | {
      provider: "mongodb";
      options: TMongooseProvider;
    };

export type TDatabaseRecordResult<T> = keyof T;
