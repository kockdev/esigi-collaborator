import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(9)
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2)
  @IsString()
  ddd: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2)
  @IsString()
  ddi: string;
}
