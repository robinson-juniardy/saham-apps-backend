import MasterRemarksReferensi from "./master_remarks_referensi";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "setup_remarks_referensi" })
export default class SetupRemarksReferensi extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  setup_remarks_id: number;

  @Column({ type: "character varying" })
  kode_remarks_referensi: string;

  @Column({ type: "integer" })
  digit_start: number;

  @Column({ type: "integer" })
  digit_end: number;

  @Column({ type: "integer" })
  digit_length: number;

  @OneToOne(() => MasterRemarksReferensi)
  @JoinColumn({
    name: "kode_remarks_referensi",
    referencedColumnName: "kode_referensi",
  })
  detail_referensi!: MasterRemarksReferensi;
}
