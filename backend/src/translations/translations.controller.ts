import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslateDto, CreateTranslationDto } from './dto/translate.dto';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post('translate')
  translate(@Body() translateDto: TranslateDto) {
    return this.translationsService.translate(translateDto);
  }

  @Get()
  findAll() {
    return this.translationsService.findAll();
  }

  @Post()
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Get('search')
  searchModismos(@Query('q') query: string) {
    return this.translationsService.searchModismos(query);
  }

  @Get('country/:code')
  getModismosByCountry(@Param('code') code: string) {
    return this.translationsService.getModismosByCountry(code);
  }

  @Get('word/:word/:country')
  getWordTranslations(@Param('word') word: string, @Param('country') country: string) {
    return this.translationsService.getWordTranslations(word, country);
  }
}
