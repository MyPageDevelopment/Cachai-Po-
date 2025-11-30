import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface Modismo {
  palabraOrigen: string;
  paisOrigen: string;
  palabraDestino: string;
  paisDestino: string;
  contexto: string;
}

@Injectable()
export class ModismoLoaderService implements OnModuleInit {
  private modismos: Modismo[] = [];
  private modismosIndex: Map<string, Modismo[]> = new Map();

  onModuleInit() {
    this.loadModismos();
    this.buildIndex();
    console.log(`🎉 Sistema de modismos inicializado con ${this.modismos.length} entradas`);
  }

  private loadModismos() {
    try {
      // Usar path relativo desde src en desarrollo o dist en producción
      const isDev = !__dirname.includes('dist');
      const filePath = isDev 
        ? path.join(__dirname, '..', '..', 'data', 'modismos.txt')
        : path.join(__dirname, '..', '..', '..', 'data', 'modismos.txt');
      
      const content = fs.readFileSync(filePath, 'utf-8');
      
      const lines = content.split('\n');
      
      for (const line of lines) {
        // Ignorar líneas vacías, comentarios y títulos
        if (!line.trim() || line.startsWith('#') || line.startsWith('##')) {
          continue;
        }

        const parts = line.split('|');
        if (parts.length === 5) {
          this.modismos.push({
            palabraOrigen: parts[0].trim().toLowerCase(),
            paisOrigen: parts[1].trim(),
            palabraDestino: parts[2].trim(),
            paisDestino: parts[3].trim(),
            contexto: parts[4].trim(),
          });
        }
      }

      console.log(`✅ Cargados ${this.modismos.length} modismos`);
    } catch (error) {
      console.error('❌ Error al cargar modismos:', error.message);
    }
  }

  private buildIndex() {
    for (const modismo of this.modismos) {
      const key = `${modismo.palabraOrigen}|${modismo.paisOrigen}`;
      if (!this.modismosIndex.has(key)) {
        this.modismosIndex.set(key, []);
      }
      this.modismosIndex.get(key).push(modismo);
    }
  }

  findTranslations(palabra: string, paisOrigen: string, paisDestino: string): Modismo[] {
    const key = `${palabra.toLowerCase()}|${paisOrigen}`;
    const all = this.modismosIndex.get(key) || [];
    
    // Filtrar por país destino o neutral
    return all.filter(m => 
      m.paisDestino === paisDestino || m.paisDestino === 'NEUTRAL'
    );
  }

  findAllFromCountry(paisOrigen: string): Modismo[] {
    return this.modismos.filter(m => m.paisOrigen === paisOrigen);
  }

  translatePhrase(phrase: string, paisOrigen: string, paisDestino: string): string {
    const words = phrase.split(' ');
    const translatedWords: string[] = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const cleanWord = word.toLowerCase().replace(/[.,;:!?¿¡]/g, '');
      
      // Intentar con combinaciones de 3 palabras
      if (i + 2 < words.length) {
        const threeWords = [words[i], words[i + 1], words[i + 2]].join(' ').toLowerCase().replace(/[.,;:!?¿¡]/g, '');
        const translations = this.findTranslations(threeWords, paisOrigen, paisDestino);
        if (translations.length > 0) {
          translatedWords.push(translations[0].palabraDestino);
          i += 2;
          continue;
        }
      }

      // Intentar con combinaciones de 2 palabras
      if (i + 1 < words.length) {
        const twoWords = [words[i], words[i + 1]].join(' ').toLowerCase().replace(/[.,;:!?¿¡]/g, '');
        const translations = this.findTranslations(twoWords, paisOrigen, paisDestino);
        if (translations.length > 0) {
          translatedWords.push(translations[0].palabraDestino);
          i += 1;
          continue;
        }
      }

      // Intentar con palabra simple
      const translations = this.findTranslations(cleanWord, paisOrigen, paisDestino);
      if (translations.length > 0) {
        translatedWords.push(translations[0].palabraDestino);
      } else {
        translatedWords.push(word);
      }
    }

    return translatedWords.join(' ');
  }

  getAllModismos(): Modismo[] {
    return this.modismos;
  }

  searchModismos(query: string): Modismo[] {
    const lowerQuery = query.toLowerCase();
    return this.modismos.filter(m => 
      m.palabraOrigen.includes(lowerQuery) ||
      m.palabraDestino.includes(lowerQuery) ||
      m.contexto.toLowerCase().includes(lowerQuery)
    );
  }
}
