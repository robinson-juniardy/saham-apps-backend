import { Postgres, MySQL } from "../../config/database";
import { QueryResult } from "pg";
import { TDatabaseRecordResult } from "../../core/legato/types/database.types";

export default class ExampleServices {
  constructor(private db = Postgres, private mysqldb = MySQL) {}

  async GetRingkasanSaham(Record: TDatabaseRecordResult<QueryResult>) {
    return this.db
      .query("SELECT * FROM ringkasan_saham", Record)
      .then((data) => data)
      .catch((error) => error);
  }

  async Getproducts() {
    return this.mysqldb
      .query("SELECT * FROM products", null)
      .then((data) => data)
      .catch((error) => error);
  }
}
