import { Postgres, SqlServer, MySQL } from "../../config/database";
import { PostgresORM } from "../../config/typeorm";
import SetupRemarksReferensi from "../../entities/setup_remarks_referensi";

/**
 * file created detail
 * Setup Service
 * created At : Sun Dec 04 2022 23:19:59 GMT+0800 (Central Indonesia Time)
 */

export default class SetupService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL,
    private db = PostgresORM
  ) {}

  async SetupRemarksReferensi(): Promise<SetupRemarksReferensi[]> {
    return this.db.getRepository(SetupRemarksReferensi).find({
      relations: {
        detail_referensi: true,
      },
    });
  }

  Print() {
    return "this is Setup service";
  }
}
