import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'phone' })
export class PhoneEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phoneNumber: string;

  @Column({ length: 2 })
  ddd: string;

  @Column()
  ddi: string;

  @OneToOne(() => CollaboratorsEntity, (collaborator) => collaborator.Phone)
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}
