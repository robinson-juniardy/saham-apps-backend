import MasterSaham from "./master_saham";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "ringkasan_saham" })
export default class RingkasanSaham extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id_ringkasan_saham: number;

  @PrimaryColumn({ type: "character varying" })
  // @Column({ type: "char varying" })
  kode_saham: string;

  @Column({ type: "text" })
  nama_perusahaan: string;

  @Column({ type: "character varying" })
  kode_master_saham: string;

  @Column({ type: "character varying", length: 30 })
  remarks: string;

  @Column({ type: "bigint" })
  sebelumnya: number;

  @Column({ type: "bigint" })
  open_price: number;

  @Column({ type: "bigint" })
  first_trade: number;

  @Column({ type: "bigint" })
  tertinggi: number;

  @Column({ type: "bigint" })
  terendah: number;

  @Column({ type: "bigint" })
  penutupan: number;

  @Column({ type: "bigint" })
  selisih: number;

  @Column({ type: "bigint" })
  volume: number;

  @Column({ type: "bigint" })
  nilai: number;

  @Column({ type: "bigint" })
  frekuensi: number;

  @Column({ type: "numeric" })
  index_individual: number;

  @Column({ type: "bigint" })
  listed_shared: number;

  @Column({ type: "bigint" })
  offer: number;

  @Column({ type: "bigint" })
  offer_volume: number;

  @Column({ type: "bigint" })
  bid: number;

  @Column({ type: "bigint" })
  bid_volume: number;

  @Column({ type: "character varying", length: 12 })
  last_trading_date: string;

  @Column({ type: "bigint" })
  tradeble_shares: number;

  @Column({ type: "bigint" })
  weight_for_index: number;

  @Column({ type: "bigint" })
  foreign_sell: number;

  @Column({ type: "bigint" })
  foreign_buy: number;

  @Column({ type: "bigint" })
  non_regular_value: number;

  @Column({ type: "bigint" })
  non_regular_volume: number;

  @Column({ type: "bigint" })
  non_regular_frequency: number;

  @CreateDateColumn({ type: "date" })
  created_date: Date;

  @Column({ type: "bigint" })
  created_by: string;

  @PrimaryColumn({ type: "date" })
  tanggal_ringkasan: Date;

  @OneToOne(() => MasterSaham)
  @JoinColumn({ name: "kode_master_saham", referencedColumnName: "kode_saham" })
  detail_saham!: MasterSaham;
}
