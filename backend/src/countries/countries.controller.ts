import { Controller, Get, Post, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from '@prisma/client';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string): Promise<Country> {
    return this.countriesService.findOne(code);
  }

  @Post('seed')
  async seed(): Promise<{ message: string }> {
    await this.countriesService.seedCountries();
    return { message: 'Countries seeded successfully' };
  }
}
