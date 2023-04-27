import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "master_klasifikasi_index" })
export default class MasterKlasifikasiIndex extends BaseEntity {
  @PrimaryColumn({ type: "character varying", length: 50 })
  kode_index: string;

  @Column({ type: "character varying", length: 50 })
  klasifikasi: string;

  @Column({ type: "character varying", length: 255 })
  nama_index: string;
}
