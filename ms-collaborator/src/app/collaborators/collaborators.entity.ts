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
import { MaritalStatus } from './dtos/MaritalStatus.enum';
import { DependentsEntity } from '../dependents/dependents.entity';
import { FeedbacksEntity } from '../feedbacks/feedbacks.entity';

@Entity({ name: 'collaborators' })
export class CollaboratorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstname_corporatename' })
  firstNameCorporateName: string;

  @Column({ name: 'lastname_fantasyname' })
  lastNameFantasyName: string;

  @Column({ name: 'login' })
  login: string;

  @Column({ name: 'gender', type: 'int' })
  gender: Gender;

  @Column({ type: 'int' })
  maritalStatus: MaritalStatus;

  @Column({ name: 'office' })
  office: string;

  @Column({ name: 'collaborator_types' })
  collaboratorTypes: CollaboratorTypes;

  @Column({ name: 'cpf', unique: true, length: 11 })
  cpf: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ name: 'email' })
  email: string;

  @Column()
  active: boolean;

  @Column()
  admissionDate: Date;

  @Column({ name: 'cnpj', length: 14 })
  cnpj: string;

  @Column({ name: 'state_registration' })
  stateRegistration: string;

  @Column({ name: 'municipal_inscription' })
  municipalInscription: string;

  @Column({ name: 'site' })
  site: string;

  @Column({ name: 'linkedin' })
  linkedin: string;

  @Column({ name: 'photo', type: 'blob', nullable: true })
  photo: string;

  @OneToOne(() => AddressEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Address: AddressEntity;

  @OneToMany(() => SkillsEntity, (skills) => skills.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Skills: SkillsEntity[];

  @OneToMany(() => FeedbacksEntity, (feed) => feed.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Feedbacks: FeedbacksEntity[];

  @OneToMany(() => DocumentsEntity, (documents) => documents.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Documents: DocumentsEntity[];

  @OneToMany(() => LanguagesEntity, (languages) => languages.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Languages: LanguagesEntity[];

  @OneToMany(() => EducationsEntity, (educations) => educations.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Educations: EducationsEntity[];

  @OneToOne(() => PhoneEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Phone: PhoneEntity;

  @OneToMany(() => BankDataEntity, (BankData) => BankData.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  BankData: BankDataEntity[];

  @OneToMany(() => FinancialsEntity, (Financials) => Financials.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Financials: FinancialsEntity[];

  @OneToMany(() => DependentsEntity, (Dependents) => Dependents.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Dependents: DependentsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
