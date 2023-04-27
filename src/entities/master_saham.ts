import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";
@Entity({ name: "master_saham" })
export default class MasterSaham extends BaseEntity {
  @PrimaryColumn({ type: "character varying", length: 10 })
  kode_saham: string;

  @Column({ type: "character varying", length: 255 })
  nama_perusahaan: string;

  @CreateDateColumn({ type: "date" })
  created_date: Date;

  @Column({ type: "character varying" })
  created_by: string;
}
