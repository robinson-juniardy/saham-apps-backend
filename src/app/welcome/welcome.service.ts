import { Postgres, SqlServer, MySQL } from "../../config/database";
import {
  PostgreeContext,
  SqlServerContext,
  TDatabaseRecordResult,
} from "../../core/legato/types/database.types";

export default class WelcomeService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL
  ) {}
  Print() {
    return "Welcome to Legato";
  }
}
