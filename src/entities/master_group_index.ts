import MasterKlasifikasiIndex from "./master_klasifikasi_index";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "master_group_index" })
export default class MasterGroupIndex extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id_master_group_index: number;

  @Column({ type: "character varying", length: 50 })
  kode_index: string;

  @Column({ type: "integer" })
  index_number: number;

  @Column({ type: "integer" })
  group_index: number;

  @OneToOne(() => MasterKlasifikasiIndex)
  @JoinColumn({ name: "kode_index", referencedColumnName: "kode_index" })
  klasifikasi!: MasterKlasifikasiIndex;
}
