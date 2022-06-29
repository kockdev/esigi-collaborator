import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class CreateExperiencesDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  office: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  locality: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  startMonth: number;

  @ApiProperty()
  @IsNotEmpty()
  startYear: number;

  @ApiProperty()
  @IsOptional()
  terminusMonth: string;

  @ApiProperty()
  @IsOptional()
  terminusYear: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  sector: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Resume: ResumesEntity;
}
