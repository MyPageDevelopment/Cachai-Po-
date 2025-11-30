import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDictionaryEntryDto } from './dto/create-dictionary-entry.dto';
import { DictionaryEntry } from '@prisma/client';

@Injectable()
export class DictionaryService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<DictionaryEntry[]> {
    return this.prisma.dictionaryEntry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUser(userId: string): Promise<DictionaryEntry[]> {
    return this.prisma.dictionaryEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createDictionaryEntryDto: CreateDictionaryEntryDto): Promise<DictionaryEntry> {
    return this.prisma.dictionaryEntry.create({
      data: createDictionaryEntryDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.dictionaryEntry.delete({
      where: { id },
    });
  }
}
