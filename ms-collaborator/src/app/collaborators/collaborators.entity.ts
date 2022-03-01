import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from 'src/app/address/address.entity';
import { PhoneEntity } from 'src/app/phone/phone.entity';
import { BankDataEntity } from 'src/app/bank-data/bank-data.entity';
import { SkillsEntity } from 'src/app/skills/skills.entity';
import { CollaboratorTypes } from './dtos/types.enum';
import { FinancialsEntity } from 'src/app/financials/financials.entity';
import { DocumentsEntity } from '../documents/documents.entity';
import { LanguagesEntity } from '../languages/languages.entity';
import { EducationsEntity } from '../educations/educations.entity';
import { MaritalStatus } from './dtos/Marital-status.enum';
import { DependentsEntity } from '../dependents/dependents.entity';
import { FeedbacksEntity } from '../feedbacks/feedbacks.entity';
import { Gender } from './dtos/gender.enum';

@Entity({ name: 'collaborators' })
export class CollaboratorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstNameCorporateName: string;

  @Column()
  lastNameFantasyName: string;

  @Column()
  login: string;

  @Column({ type: 'int' })
  gender: Gender;

  @Column({ type: 'int' })
  maritalStatus: MaritalStatus;

  @Column()
  office: string;

  @Column()
  collaboratorTypes: CollaboratorTypes;

  @Column({ unique: true, length: 11, nullable: true })
  cpf: string;

  @Column()
  birthDate: Date;

  @Column()
  email: string;

  @Column()
  active: boolean;

  @Column()
  admissionDate: Date;

  @Column({ unique: true, length: 14, nullable: true })
  cnpj: string;

  @Column({ nullable: true })
  stateRegistration: string;

  @Column({ nullable: true })
  municipalInscription: string;

  @Column()
  site: string;

  @Column()
  linkedin: string;

  @Column({ nullable: true })
  photo: Buffer;

  @OneToOne(() => AddressEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Address: AddressEntity;

  @OneToMany(() => SkillsEntity, (skills) => skills.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Skills: SkillsEntity[];

  @OneToMany(() => FeedbacksEntity, (feed) => feed.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Feedbacks: FeedbacksEntity[];

  @OneToMany(() => DocumentsEntity, (documents) => documents.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Documents: DocumentsEntity[];

  @OneToMany(() => LanguagesEntity, (languages) => languages.Collaborator, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Languages: LanguagesEntity[];

  @OneToMany(() => EducationsEntity, (educations) => educations.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Educations: EducationsEntity[];

  @OneToOne(() => PhoneEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Phone: PhoneEntity;

  @OneToMany(() => BankDataEntity, (bank) => bank.collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  BankData: BankDataEntity[];

  @OneToMany(() => FinancialsEntity, (Financials) => Financials.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Financials: FinancialsEntity[];

  @OneToMany(() => DependentsEntity, (Dependents) => Dependents.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  Dependents: DependentsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
