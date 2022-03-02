import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Fluency } from './fluency.enum';

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  languageName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Fluency)
  degreeOfInfluence: Fluency;
}