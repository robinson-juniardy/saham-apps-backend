import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "financial_report" })
export default class FinancialReport extends BaseEntity {
  @PrimaryColumn({ type: "character varying", length: 10 })
  kode_saham: string;

  @PrimaryColumn({ type: "character varying" })
  quarter: string;

  @Column()
  sales: number;

  @Column()
  year: string;

  @Column()
  asset: number;

  @Column()
  liability: number;

  @Column()
  equity: number;

  @Column()
  op_profit: number;

  @Column()
  net_profit: number;

  @Column()
  ceps: number;
}
