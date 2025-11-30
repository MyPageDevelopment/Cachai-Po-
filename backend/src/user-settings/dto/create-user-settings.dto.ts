import { IsString, IsNotEmpty, IsBoolean, IsEmail, IsOptional, IsIn } from 'class-validator';

export class CreateUserSettingsDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  originCountryCode: string;

  @IsString()
  @IsNotEmpty()
  originCountryName: string;

  @IsString()
  @IsNotEmpty()
  originCountryFlag: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsBoolean()
  @IsOptional()
  realtimeTranslation?: boolean;

  @IsString()
  @IsOptional()
  @IsIn(['slow', 'normal', 'fast'])
  readingSpeed?: string;

  @IsBoolean()
  @IsOptional()
  darkMode?: boolean;

  @IsString()
  @IsOptional()
  @IsIn(['es', 'en'])
  language?: string;
}
