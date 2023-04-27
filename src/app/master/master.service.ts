import { Postgres, SqlServer, MySQL } from "../../config/database";
import { PostgresORM } from "../../config/typeorm";
import MasterSaham from "../../entities/master_saham";
import MasterKlasifikasiIndex from "../../entities/master_klasifikasi_index";
import MasterGroupIndex from "../../entities/master_group_index";
import MasterRemarksReferensi from "../../entities/master_remarks_referensi";
import {
  TDatabaseRecordResult,
  PostgreeContext,
} from "../../core/legato/types/database.types";

/**
 * file created detail
 * Master Service
 * created At : Sun Dec 04 2022 20:58:46 GMT+0800 (Central Indonesia Time)
 */

export default class MasterService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL,
    private db = PostgresORM
  ) {}

  /**
   * Get semua data dari tabel master saham
   * @returns Promise<MasterSaham[]>
   */
  async MasterSaham(): Promise<MasterSaham[]> {
    const Repo = this.db.getRepository(MasterSaham);
    return Repo.find();
  }

  /**
   * Get semua data dari table master_klasifikasi_index
   * @returns Promise<MasterKlasifikasiIndex[]>
   */
  async MasterKlasifikasiIndeks(): Promise<MasterKlasifikasiIndex[]> {
    return this.db.getRepository(MasterKlasifikasiIndex).find();
  }

  /**
   * Get semua data dari table master_group_index
   * @returns Promise<MasterGroupIndex[]>
   */
  async MasterGroupIndex(): Promise<MasterGroupIndex[]> {
    return this.db.getRepository(MasterGroupIndex).find({
      relations: {
        klasifikasi: true,
      },
    });
  }

  async MasterRemarksReferensi(): Promise<MasterRemarksReferensi[]> {
    return this.db.getRepository(MasterRemarksReferensi).find();
  }

  MasterSahamQuarter(Record: TDatabaseRecordResult<PostgreeContext>) {
    return this.postgres.query(
      `SELECT * FROM profile_saham ps
       LEFT JOIN master_saham ms ON ms.kode_saham = ps.kode_saham AND ms.quarter = ps.quarter
       `,
      Record
    );
  }
  InsertProfileSaham(
    Record: TDatabaseRecordResult<PostgreeContext>,
    params: {
      kode_saham: string;
      quarter: number;
      year: number;
      currency: string;
      sales: number;
      assets: number;
      liability: number;
      equity: number;
      opP: number;
      np: number;
      ceps: number;
      dpr: number;
    }
  ) {
    let query = `INSERT INTO profile_saham(kode_saham, quarter, year, currency, sales, assets, liability, equity, opp, np, ceps, dpr) 
       VALUES ('${params.kode_saham}', ${params.quarter}, ${params.year}, '${params.currency}', ${params.sales}, ${params.liability}, ${params.assets}, ${params.equity}, ${params.opP}, ${params.np}, ${params.ceps}, ${params.dpr})`;
    return this.postgres.query(query, Record);
  }
  insertMasterSaham(
    Record: TDatabaseRecordResult<PostgreeContext>,
    params: Partial<{
      kode_saham: string;
      quarter: number;
      year: number;
      // listing_date: Date;
      ipo_price: number | null;
      ipo_shares: number | null;
      nama_perusahaan: string;
      created_date: string;
    }>
  ) {
    console.log(params);
    let query = `INSERT INTO master_saham (kode_saham, nama_perusahaan, ipo_price, ipo_shares, quarter, year, created_date) 
                 VALUES ('${params.kode_saham}', '${params.nama_perusahaan}', ${params.ipo_price}, ${params.ipo_price}, ${params.quarter}, ${params.year}, '${params.created_date}')`;
    console.log(query);
    return this.postgres.query(query, Record);
  }
}
