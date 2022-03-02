import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Seniority } from './seniority.enum';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  technology: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  yearsExperience: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Seniority)
  seniority: Seniority;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  currentPosition: boolean;
}