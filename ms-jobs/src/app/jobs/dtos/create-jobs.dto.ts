import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDataURI,
  IsDate,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsSemVer,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BehaviroalInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from 'src/app/client-interviews/client-interviews.entity';
import { KnowledgesEntity } from 'src/app/knowledges/knowledges.entity';
import { LanguagesEntity } from 'src/app/languages/languages.entity';
import { SenioritiesEntity } from 'src/app/seniorities/seniorities.entity';
import { TechnicalInterviewsEntity } from 'src/app/technical-interviews/technical-interviews.entity';
import { Schooling } from './schooling.enum';
import { Status } from './status.enum';
import { Type } from './type.enum';
import { TypeOfContract } from './typeOfContract.enum';
import { Workplace } from './workplace.enum';

export class CreateJobsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  requester: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  publish: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  client: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type)
  typeOfJob: Type;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  temporary: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  monthTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  jobName: string;

  @ApiProperty()
  @IsNotEmpty()
  startForecast: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  jobNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeOfContract)
  typeOfContract: TypeOfContract;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Workplace)
  workplace: Workplace;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  workingDay: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  minimumValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maximumValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Workplace)
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  collaboratorActivities: string;

  @ApiProperty()
  @IsOptional()
  Knowledges: KnowledgesEntity[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  skills: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  attitudes: string;

  @ApiProperty()
  @IsNotEmpty()
  openingDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  Seniorities: SenioritiesEntity;

  @ApiProperty()
  @IsOptional()
  Languages: LanguagesEntity[];

  @ApiProperty()
  @IsOptional()
  behaviorInterviews: BehaviroalInterviewsEntity[];

  @ApiProperty()
  @IsOptional()
  clientInterviews: ClientInterviewsEntity[];

  @ApiProperty()
  @IsOptional()
  technicalInterviews: TechnicalInterviewsEntity[];
}
