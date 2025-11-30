import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { CreateUserSettingsDto } from './dto/create-user-settings.dto';
import { UserSettings } from '@prisma/client';

@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get(':userId')
  findByUserId(@Param('userId') userId: string): Promise<UserSettings> {
    return this.userSettingsService.findByUserId(userId);
  }

  @Post()
  createOrUpdate(@Body() createUserSettingsDto: CreateUserSettingsDto): Promise<UserSettings> {
    return this.userSettingsService.createOrUpdate(createUserSettingsDto);
  }
}
