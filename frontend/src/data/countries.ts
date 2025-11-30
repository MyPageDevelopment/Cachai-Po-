import { Country } from "@/types";


export const countries: Country[] = [
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪" },
  { code: "ES", name: "España", flag: "🇪🇸" },
  { code: "PE", name: "Perú", flag: "🇵🇪" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
];

export const translationData: { [key: string]: { [key: string]: { text: string; equivalences: { [key: string]: string } } } } = {
  "CL-MX": {
    "Está piola el carrete": {
      text: "Está chida la fiesta",
      equivalences: { piola: "chida", carrete: "fiesta" },
    },
    "Anda a la chucha": {
      text: "Vete a la fregada",
      equivalences: { "Anda a la chucha": "Vete a la fregada" },
    },
    "Cuático": {
      text: "Bien loco",
      equivalences: { Cuático: "Bien loco" },
    },
    "Bacán": {
      text: "Chido",
      equivalences: { Bacán: "Chido" },
    },
    "No puede ser compadre": {
      text: "No manches güey",
      equivalences: { "No puede ser": "No manches", compadre: "güey" },
    },
  },
  "MX-CL": {
    "No manches güey": {
      text: "No puede ser compadre",
      equivalences: { "No manches": "No puede ser", güey: "compadre" },
    },
    "Está chida la fiesta": {
      text: "Está piola el carrete",
      equivalences: { chida: "piola", fiesta: "carrete" },
    },
  },
  "CL-AR": {
    "Bacán": {
      text: "Copado",
      equivalences: { Bacán: "Copado" },
    },
  },
  "AR-CL": {
    "Che boludo, ¿qué hacés?": {
      text: "Oye compadre, ¿qué haces?",
      equivalences: { Che: "Oye", boludo: "compadre", hacés: "haces" },
    },
    "Re copado": {
      text: "Bacán",
      equivalences: { "Re copado": "Bacán" },
    },
    "Quilombo": {
      text: "Caos",
      equivalences: { Quilombo: "Caos" },
    },
  },
  "CO-VE": {
    "Qué chimba parce": {
      text: "Qué chévere pana",
      equivalences: { chimba: "chévere", parce: "pana" },
    },
    "Estar prendido": {
      text: "Estar arrecho",
      equivalences: { prendido: "arrecho" },
    },
  },
  "CO-CL": {
    "Qué chimba": {
      text: "Qué bacán",
      equivalences: { chimba: "bacán" },
    },
  },
  "MX-ES": {
    "No manches güey": {
      text: "No me digas tío",
      equivalences: { "No manches": "No me digas", güey: "tío" },
    },
    "Está chido": {
      text: "Está guay",
      equivalences: { chido: "guay" },
    },
  },
  "PE-AR": {
    "Qué trome causa": {
      text: "Qué groso che",
      equivalences: { trome: "groso", causa: "che" },
    },
    "Está jato": {
      text: "Está al pedo",
      equivalences: { jato: "al pedo" },
    },
  },
  "VE-CO": {
    "Está arrecho el peo": {
      text: "Está berraco el parche",
      equivalences: { arrecho: "berraco", peo: "parche" },
    },
  },
  "UY-CL": {
    "Ta bueno bo": {
      text: "Está bueno po",
      equivalences: { "Ta bueno": "Está bueno", bo: "po" },
    },
  },
  "ES-MX": {
    "Qué guay tío": {
      text: "Qué padre güey",
      equivalences: { guay: "padre", tío: "güey" },
    },
  },
};

export function getTranslation(text: string, originCode: string, destCode: string) {
  const key = `${originCode}-${destCode}`;
  const translations = translationData[key];
  
  if (translations && translations[text]) {
    return {
      original: text,
      translated: translations[text].text,
      equivalences: translations[text].equivalences,
    };
  }
  
  // Default fallback
  return {
    original: text,
    translated: text + " (traducción no disponible)",
    equivalences: {},
  };
}
