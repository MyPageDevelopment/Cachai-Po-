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
    "Che boludo": {
      text: "Oye compadre",
      equivalences: { Che: "Oye", boludo: "compadre" },
    },
  },
  "CO-CL": {
    "Qué chimba": {
      text: "Qué bacán",
      equivalences: { chimba: "bacán" },
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
