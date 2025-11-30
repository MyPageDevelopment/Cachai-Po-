import { IsString, IsNotEmpty, IsObject, Length } from 'class-validator';

export class TranslateDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  originCountryCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  destinationCountryCode: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreateTranslationDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  originCountryCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  destinationCountryCode: string;

  @IsString()
  @IsNotEmpty()
  originalText: string;

  @IsString()
  @IsNotEmpty()
  translatedText: string;

  @IsObject()
  equivalences: Record<string, string>;
}
