import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Reasons } from './contract-reasons.enum';
import { ContractTypes } from './contract-types.enum';

export class UpdateFinancialsDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(ContractTypes)
  contractType: ContractTypes;

  @ApiProperty()
  @IsOptional()
  value: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Reasons)
  reason: Reasons;

  @ApiProperty()
  @IsOptional()
  dateInclusion: string;

  @ApiProperty()
  @IsOptional()
  payday: string;

  @ApiProperty()
  @IsOptional()
  monthlyValue: number;

  @IsOptional()
  Collaborator: CollaboratorsEntity;


}
