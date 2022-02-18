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
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class CreateClientInterviewsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  nameCandidate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  evaluator: string;

  @ApiProperty()
  @IsNotEmpty()
  clientInterviewDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  hourInterview: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Punctuality)
  punctuality: Punctuality;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobProfile: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  technicalEvaluation: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comments: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  situational: boolean;

  @ApiProperty()
  @IsNotEmpty()
  jobs: JobsEntity[];
}
