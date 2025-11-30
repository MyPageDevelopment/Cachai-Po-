import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserSettingsDto } from './dto/create-user-settings.dto';
import { UserSettings } from '@prisma/client';

@Injectable()
export class UserSettingsService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<UserSettings> {
    return this.prisma.userSettings.findUnique({
      where: { userId },
    });
  }

  async createOrUpdate(createUserSettingsDto: CreateUserSettingsDto): Promise<UserSettings> {
    const existing = await this.findByUserId(createUserSettingsDto.userId);
    
    if (existing) {
      return this.prisma.userSettings.update({
        where: { userId: createUserSettingsDto.userId },
        data: createUserSettingsDto,
      });
    }

    return this.prisma.userSettings.create({
      data: createUserSettingsDto,
    });
  }
}
