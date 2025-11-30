import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDictionaryEntryDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  word: string;

  @IsString()
  @IsNotEmpty()
  translation: string;

  @IsString()
  @IsNotEmpty()
  originCountryCode: string;

  @IsString()
  @IsNotEmpty()
  originCountryName: string;

  @IsString()
  @IsNotEmpty()
  originCountryFlag: string;

  @IsString()
  @IsNotEmpty()
  destinationCountryCode: string;

  @IsString()
  @IsNotEmpty()
  destinationCountryName: string;

  @IsString()
  @IsNotEmpty()
  destinationCountryFlag: string;
}
