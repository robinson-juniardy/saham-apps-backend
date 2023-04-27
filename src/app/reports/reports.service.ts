import { Postgres, SqlServer, MySQL } from "../../config/database";
import { PostgresORM } from "../../config/typeorm";
import FinancialReport from "../../entities/financial_report";
import {
  PostgreeContext,
  SqlServerContext,
  TDatabaseRecordResult,
} from "../../core/legato/types/database.types";

/**
 * file created detail
 * Reports Service
 * created At : Thu Apr 13 2023 11:01:47 GMT+0800 (Central Indonesia Time)
 */

export default class ReportsService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL,
    private db = PostgresORM
  ) {}
  Print() {
    return "this is Reports service";
  }
  async getFinancialReport(Record: TDatabaseRecordResult<PostgreeContext>) {
    return this.postgres.query(
      "SELECT financial_report.*, master_saham.nama_perusahaan FROM financial_report LEFT JOIN master_saham ON master_saham.kode_saham = financial_report.kode_saham",
      Record
    );
  }

  async saveFinancialReport() {
    return this.db.getRepository(FinancialReport);
  }
}
