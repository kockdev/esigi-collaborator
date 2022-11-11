import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { errorMonitor } from 'mysql2/typings/mysql/lib/Connection';
import { FindManyOptions, Like } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Repository } from 'typeorm/repository/Repository';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { UpdateJobsDto } from './dtos/update-jobs.dto';
import { JobsEntity } from './jobs.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobsEntity)
    private readonly jobsRepository: Repository<JobsEntity>,
    private httpService: HttpService,
  ) {}

  async findAll(token: string) {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    try {
      const jobs = await this.jobsRepository.find(options);
      return await this.jobRequest(jobs, token);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByResume(id: string, token: string) {
    try {
      const jobs = await this.jobsRepository
        .query(`select jobs_entity.collaborator_requester_id, jobs_entity.job_name, jobs_entity.customer_id, jobs_entity.type_of_contract, jobs_entity.publish, jobs_entity.status, b.behavioral_interview_date,  r.date_of_return from jobs_entity
      left join interviews_enitiy i on i.job_id = jobs_entity.id
      left join behavioral_interviews_entity b on i.behavioral_interviews_id = b.id
      left join returns_entity r on i.returns_id = r.id where i.name_candidate = "${id}"`);

      return await this.jobRequest(jobs, token);
    } catch (error) {}
  }

  findByName(name: string, token: string) {
    let job;
    if (name === '') {
      job = this.findAll(token);
      return job;
    } else {
      job = this.jobsRepository.find({
        where: [{ jobName: Like(`%${name}%`) }],
      });
      return this.jobRequest(job, token);
    }
  }

  async findOneOrFail(
    conditions: FindConditions<JobsEntity>,
    options?: FindOneOptions<JobsEntity>,
  ) {
    options = {
      relations: [
        'Seniorities',
        'Knowledges',
        'Languages',
        'Returns',
        'Interviews',
      ],
    };

    try {
      return await this.jobsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async jobRequest(jobs: any, token: string) {
    try {
      const collaboratorIdList = jobs.map((job) => {
        return job.collaboratorRequesterId;
      });

      const collaborators = await this.httpService
        .post(
          'http://localhost:3501/api/v1/collaborators/list',
          {
            idList: collaboratorIdList,
          },
          {
            headers: {
              authorization: token,
            },
          },
        )
        .toPromise();

      if (collaborators.data) {
        jobs.map((job) => {
          const collaborator = collaborators.data.find(
            (collaborator) => collaborator.id === job.collaboratorRequesterId,
          );
          if (collaborator) {
            job.collaborator = {
              firstNameCorporateName: collaborator.firstNameCorporateName,
              lastNameFantasyName: collaborator.lastNameFantasyName,
            };
            return job;
          }
          job.collaborator = {
            firstNameCorporateName: 'Não',
            lastNameFantasyName: 'definido',
          };
          return job;
        });
      }
      const customerIdList = jobs.map((job) => {
        return job.customerId;
      });

      const customers = await this.httpService
        .post(
          'http://localhost:3506/api/v1/customers/list',
          {
            idList: customerIdList,
          },
          {
            headers: {
              authorization: token,
            },
          },
        )
        .toPromise();
      if (customers.data) {
        jobs.map((job) => {
          const customer = customers.data.find(
            (customer) => customer.id === job.customerId,
          );

          job.customer = {
            corporateName: customer.corporateName,
          };
          return job;
        });
      }
      return jobs;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async store(data: CreateJobsDto) {
    const job = this.jobsRepository.create(data);
    return await this.jobsRepository.save(job);
  }

  async update(id: string, data: UpdateJobsDto) {
    try {
      const job = await this.jobsRepository.findOneOrFail(
        { id },
        { relations: ['Seniorities'] },
      );
      data.Seniorities.id = job.Seniorities.id;
    } catch {
      throw new NotFoundException();
    }
    return await this.jobsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.jobsRepository.findOneOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
    return await this.jobsRepository.softDelete({ id });
  }
}
