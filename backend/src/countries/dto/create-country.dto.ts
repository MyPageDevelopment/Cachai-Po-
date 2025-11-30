import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  flag: string;
}
