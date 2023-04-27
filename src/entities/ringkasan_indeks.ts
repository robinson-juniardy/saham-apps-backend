import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import MasterKlasifikasiIndex from "./master_klasifikasi_index";

@Entity({ name: "ringkasan_index" })
export default class RingkasanIndeks extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column()
  kode_klasifikasi_index: string;

  @Column({ type: "numeric" })
  sebelumnya: number;

  @Column({ type: "numeric" })
  tertinggi: number;

  @Column({ type: "numeric" })
  terendah: number;

  @Column({ type: "numeric" })
  penutupan: number;

  @Column({ type: "integer" })
  stock: number;

  @Column({ type: "numeric" })
  selisih: number;

  @Column({ type: "bigint" })
  volume: number;

  @Column({ type: "bigint" })
  nilai: number;

  @Column({ type: "integer" })
  frekuensi: number;

  @Column({ type: "bigint" })
  kapitalisasi_pasar: number;

  @Column({ type: "date" })
  tanggal_ringkasan: Date;

  @CreateDateColumn({ type: "date" })
  created_date: Date;

  @OneToOne(() => MasterKlasifikasiIndex)
  @JoinColumn({
    name: "kode_klasifikasi_index",
    referencedColumnName: "kode_index",
  })
  detail_index!: MasterKlasifikasiIndex;
}
