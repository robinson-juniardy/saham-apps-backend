import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "master_remarks_referensi" })
export default class MasterRemarksReferensi extends BaseEntity {
  @PrimaryColumn({ type: "character varying", length: 33 })
  kode_referensi: string;

  @Column({ type: "text" })
  nama_referensi: string;
}
