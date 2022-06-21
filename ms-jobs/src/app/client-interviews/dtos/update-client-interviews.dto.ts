import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Punctuality } from 'src/app/behavioral-interviews/enums/punctuality.enum';
import { Situation } from 'src/app/behavioral-interviews/enums/situational.enum';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class UpdateClientInterviewsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  nameCandidate: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  evaluator: string;

  @ApiProperty()
  @IsOptional()
  clientInterviewDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hourInterview: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Punctuality)
  punctuality: Punctuality;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  jobProfile: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  technicalEvaluation: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comments: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Situation)
  situational: Situation;
}
