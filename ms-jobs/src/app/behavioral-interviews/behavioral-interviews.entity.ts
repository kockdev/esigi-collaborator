import { JobsEntity } from 'src/app/jobs/jobs.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HiringPreferencesEntity } from '../hiring-preferences/hiring-preferences.entity';
import { InterviewsEnitiy } from '../interviews/interviews.entity';
import { Presentation } from './enums/presentation.enum';
import { Punctuality } from './enums/punctuality.enum';
import { Situation } from './enums/situational.enum';

@Entity()
export class BehavioralInterviewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCandidate: string;

  @Column()
  techRecruter: string;

  @Column()
  behavioralInterviewDate: Date;

  @Column()
  hourInterview: string;

  @Column()
  punctuality: Punctuality;

  @Column()
  presentation: Presentation;

  @Column()
  salaryExpectation: string;

  @Column()
  behavioralAssessment: string;

  @Column()
  comments: string;

  @Column()
  situational: Situation;

  @Column()
  availabilityOfInitialize: string;

  @OneToOne(() => HiringPreferencesEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  hiringPreference: HiringPreferencesEntity;

  @OneToOne(() => InterviewsEnitiy, (interviews) => interviews.BehavioralInterviews)
  interviews: InterviewsEnitiy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
