import { Postgres } from "../../config/database";
import { QueryResult } from "pg";
import { TDatabaseRecordResult } from "../../core/legato/types/database.types";
export default class ExampleServices {
  constructor(private db = Postgres) {}

  async GetRingkasanSaham(Record: TDatabaseRecordResult<QueryResult>) {
    return this.db
      .query("SELECT * FROM ringkasan_saham", Record)
      .then((data) => data)
      .catch((error) => error);
  }
}
