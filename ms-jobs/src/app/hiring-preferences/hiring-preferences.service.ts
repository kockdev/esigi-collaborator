import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBehaviorInterviewsDto } from 'src/app/behavioral-interviews/dtos/create-behavioral-interviews.dto';
import {
  FindCondition,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateHiringPreferencesDto } from './dtos/create-hiring-preferences.dto';
import { UpdateHiringPreferencesDto } from './dtos/update-hiring-preferences.dto';
import { HiringPreferencesEntity } from './hiring-preferences.entity';

@Injectable()
export class HiringPreferencesService {
  constructor(
    @InjectRepository(HiringPreferencesEntity)
    private readonly hiringPreferencesRepository: Repository<HiringPreferencesEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.hiringPreferencesRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<HiringPreferencesEntity>,
    options?: FindOneOptions<HiringPreferencesEntity>,
  ) {
    try {
      return await this.hiringPreferencesRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateHiringPreferencesDto) {
    const hiringPreference = this.hiringPreferencesRepository.create(data);
    return await this.hiringPreferencesRepository.save(hiringPreference);
  }

  async update(id: string, data: UpdateHiringPreferencesDto) {
    const hiringPreference =
      await this.hiringPreferencesRepository.findOneOrFail({
        id,
      });
    if (!hiringPreference) {
      throw new HttpException('Registro não existe ou é inválido', 404);
    }
    return await this.hiringPreferencesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.hiringPreferencesRepository.findOneOrFail({
        id,
      });
    } catch (error) {
      throw new HttpException('Registro não existe ou inválido', 404);
    }
    return await this.hiringPreferencesRepository.softRemove({ id });
  }
}
