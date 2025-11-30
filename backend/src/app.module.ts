import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CountriesModule } from './countries/countries.module';
import { TranslationsModule } from './translations/translations.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { UserSettingsModule } from './user-settings/user-settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CountriesModule,
    TranslationsModule,
    DictionaryModule,
    UserSettingsModule,
  ],
})
export class AppModule {}
