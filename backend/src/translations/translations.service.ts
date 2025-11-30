import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TranslateDto, CreateTranslationDto } from './dto/translate.dto';
import { ModismoLoaderService } from './modismo-loader.service';

@Injectable()
export class TranslationsService {
  constructor(
    private prisma: PrismaService,
    private modismoLoader: ModismoLoaderService,
  ) {}

  async translate(translateDto: TranslateDto) {
    const { originCountryCode, destinationCountryCode, text } = translateDto;

    // Traducir usando el sistema de modismos
    const translatedText = this.modismoLoader.translatePhrase(
      text,
      originCountryCode,
      destinationCountryCode,
    );

    // Obtener las equivalencias encontradas palabra por palabra
    const words = text.split(' ');
    const equivalences: Record<string, string> = {};

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const cleanWord = word.toLowerCase().replace(/[.,;:!?¿¡]/g, '');
      
      // Intentar con combinaciones de 3 palabras
      if (i + 2 < words.length) {
        const threeWords = [words[i], words[i + 1], words[i + 2]].join(' ').toLowerCase().replace(/[.,;:!?¿¡]/g, '');
        const translations = this.modismoLoader.findTranslations(
          threeWords,
          originCountryCode,
          destinationCountryCode,
        );
        if (translations.length > 0) {
          equivalences[threeWords] = translations[0].palabraDestino;
          i += 2;
          continue;
        }
      }

      // Intentar con combinaciones de 2 palabras
      if (i + 1 < words.length) {
        const twoWords = [words[i], words[i + 1]].join(' ').toLowerCase().replace(/[.,;:!?¿¡]/g, '');
        const translations = this.modismoLoader.findTranslations(
          twoWords,
          originCountryCode,
          destinationCountryCode,
        );
        if (translations.length > 0) {
          equivalences[twoWords] = translations[0].palabraDestino;
          i += 1;
          continue;
        }
      }

      // Intentar con palabra simple
      const translations = this.modismoLoader.findTranslations(
        cleanWord,
        originCountryCode,
        destinationCountryCode,
      );
      
      if (translations.length > 0) {
        equivalences[cleanWord] = translations[0].palabraDestino;
      }
    }

    // Verificar si hay traducción efectiva
    const hasTranslation = Object.keys(equivalences).length > 0;
    const finalTranslation = hasTranslation ? translatedText : text;

    // Guardar traducción en la base de datos
    await this.prisma.translation.create({
      data: {
        originCountryCode,
        destinationCountryCode,
        originalText: text,
        translatedText: finalTranslation,
        equivalences: equivalences,
      },
    });

    return {
      original: text,
      translated: finalTranslation,
      equivalences: equivalences,
    };
  }

  async findAll() {
    return this.prisma.translation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createTranslationDto: CreateTranslationDto) {
    return this.prisma.translation.create({
      data: createTranslationDto,
    });
  }

  // Búsqueda de modismos
  async searchModismos(query: string) {
    return this.modismoLoader.searchModismos(query);
  }

  // Obtener todos los modismos de un país
  async getModismosByCountry(countryCode: string) {
    return this.modismoLoader.findAllFromCountry(countryCode);
  }

  // Obtener todas las traducciones posibles de una palabra
  async getWordTranslations(word: string, sourceCountry: string) {
    const modismos = this.modismoLoader.getAllModismos();
    return modismos.filter(m => 
      m.palabraOrigen.toLowerCase() === word.toLowerCase() && 
      m.paisOrigen === sourceCountry
    );
  }
}
