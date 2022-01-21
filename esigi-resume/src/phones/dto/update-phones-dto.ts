import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePhonesDto {
  @IsNotEmpty()
  @Length(9)
  phoneNumber: string;

  @IsNotEmpty()
  @Length(2)
  ddd: string;

  @IsNotEmpty()
  @Length(2)
  ddi: string;
}
