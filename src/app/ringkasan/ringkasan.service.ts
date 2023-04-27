import { Postgres, SqlServer, MySQL } from "../../config/database";
import { PostgresORM } from "../../config/typeorm";
import RingkasanSaham from "../../entities/ringkasan_saham";
import RingkasanIndeks from "../../entities/ringkasan_indeks";
import MasterSaham from "../../entities/master_saham";
import MasterKlasifikasiIndex from "../../entities/master_klasifikasi_index";

/**
 * file created detail
 * Ringkasan Service
 * created At : Sun Dec 04 2022 20:58:13 GMT+0800 (Central Indonesia Time)
 */

export default class RingkasanService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL,
    private db = PostgresORM
  ) {}

  /**
   * Get semua data dari tabel ringkasan_saham
   * @returns Promise<RingkasanSaham[]>
   */
  async getRingkasanSaham(): Promise<RingkasanSaham[]> {
    return this.db.getRepository(RingkasanSaham).find({
      relations: {
        detail_saham: true,
      },
      order: {
        last_trading_date: "ASC",
      },
    });
  }

  async insertMasterSaham() {
    return this.db.getRepository(MasterSaham);
  }

  async insertMasterKlasifikasiIndeks() {
    return this.db.getRepository(MasterKlasifikasiIndex);
  }

  async UploadRIngkasanSaham() {
    return this.db.getRepository(RingkasanSaham);
  }

  async UploadRingkasanIndeks() {
    return this.db.getRepository(RingkasanIndeks);
  }

  /**
   * Get semua data dari tabel ringkasan_indeks
   * @returns Promise<RingkasanIndeks[]>
   */
  async getRingkasanIndeks(): Promise<RingkasanIndeks[]> {
    return this.db.getRepository(RingkasanIndeks).find({
      relations: {
        detail_index: true,
      },
    });
  }
}
