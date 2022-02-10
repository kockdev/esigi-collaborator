import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cep', length: 8 })
  cep: string;

  @Column({ name: 'street', length: 60 })
  street: string;

  @Column({ name: 'number', length: 10 })
  number: string;

  @Column({ name: 'district', length: 60 })
  district: string;

  @Column({ name: 'city', length: 60 })
  city: string;

  @Column({ name: 'state', length: 60 })
  state: string;

  @Column({ name: 'complement', nullable: true, length: 60 })
  complement: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}