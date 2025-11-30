import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryEntryDto } from './dto/create-dictionary-entry.dto';
import { DictionaryEntry } from '@prisma/client';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  findAll(): Promise<DictionaryEntry[]> {
    return this.dictionaryService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<DictionaryEntry[]> {
    return this.dictionaryService.findByUser(userId);
  }

  @Post()
  create(@Body() createDictionaryEntryDto: CreateDictionaryEntryDto): Promise<DictionaryEntry> {
    return this.dictionaryService.create(createDictionaryEntryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.dictionaryService.remove(id);
    return { message: 'Entry deleted successfully' };
  }
}
