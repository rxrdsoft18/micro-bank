import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('bank_account')
export class BankAccountEntity {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 36 })
  name: string;

  @Column({ type: 'varchar', length: 36 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'double', precision: 10, scale: 2 })
  balance: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @CreateDateColumn({ nullable: true })
  deletedAt: Date;
}
