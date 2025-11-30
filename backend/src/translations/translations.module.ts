import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { ModismoLoaderService } from './modismo-loader.service';

@Module({
  controllers: [TranslationsController],
  providers: [TranslationsService, ModismoLoaderService],
})
export class TranslationsModule {}
