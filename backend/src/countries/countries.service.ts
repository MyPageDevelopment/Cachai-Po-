import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from '@prisma/client';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Country[]> {
    return this.prisma.country.findMany();
  }

  async findOne(code: string): Promise<Country> {
    return this.prisma.country.findUnique({ where: { code } });
  }

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    return this.prisma.country.create({
      data: createCountryDto,
    });
  }

  async seedCountries(): Promise<void> {
    const countries = [
      { code: 'CL', name: 'Chile', flag: '🇨🇱' },
      { code: 'MX', name: 'México', flag: '🇲🇽' },
      { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
      { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
      { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
      { code: 'ES', name: 'España', flag: '🇪🇸' },
      { code: 'PE', name: 'Perú', flag: '🇵🇪' },
      { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
    ];

    for (const country of countries) {
      await this.prisma.country.upsert({
        where: { code: country.code },
        update: {},
        create: country,
      });
    }
  }
}
