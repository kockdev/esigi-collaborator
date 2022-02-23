import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateLanguagesDto } from './dtos/create-languages.dto';
import { UpdateLanguagesDto } from './dtos/update-languages.dto';
import { LanguagesEntity } from './languages.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguagesEntity)
    private readonly languagesRepository: Repository<LanguagesEntity>,
  ) {}

  async findAll() {
    const languagesWhiteCollaborator = await this.languagesRepository
      .createQueryBuilder('languages')
      .getMany();

    return languagesWhiteCollaborator;
  }

  async findOneOrfail(
    conditions: FindConditions<LanguagesEntity>,
    options?: FindOneOptions<LanguagesEntity>,
  ) {
    options = { relations: ['Job'] };
    try {
      return await this.languagesRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateLanguagesDto) {
    const language = this.languagesRepository.create(data);
    return await this.languagesRepository.save(language);
  }

  async update(id: string, data: UpdateLanguagesDto) {
    try {
      const language = await this.languagesRepository.findOneOrFail({
        id,
      });
    } catch {
      throw new NotFoundException();
    }
    return await this.languagesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.languagesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.languagesRepository.softDelete({ id });
  }
}
