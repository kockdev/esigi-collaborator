import { IsNotEmpty, Length, Min, Max } from 'class-validator';

export class UpdateAddressesDto {
  @IsNotEmpty()
  @Length(8)
  cep: string;

  @IsNotEmpty()
  @Min(3)
  @Max(60)
  street: string;

  @IsNotEmpty()
  @Min(1)
  @Max(10)
  number: string;

  @IsNotEmpty()
  @Min(3)
  @Max(60)
  neighborhood: string;

  @IsNotEmpty()
  @Min(3)
  @Max(60)
  city: string;

  @IsNotEmpty()
  @Min(3)
  @Max(60)
  state: string;

  @Min(3)
  @Max(60)
  complement: string;
}
