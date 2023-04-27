import { Postgres, SqlServer, MySQL } from "../../config/database";
import {
  PostgreeContext,
  SqlServerContext,
  TDatabaseRecordResult,
} from "../../core/legato/types/database.types";

/**
 * file created detail
 * Analisa Service
 * created At : Thu Dec 29 2022 14:37:25 GMT+0800 (Central Indonesia Time)
 */

export default class AnalisaService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL
  ) {}
  Print() {
    return "this is Analisa service";
  }

  getSahamKuartal(Record: TDatabaseRecordResult<PostgreeContext>) {
    return this.postgres.query(`SELECT * FROM ringkasan_saham`, Record);
  }
}
