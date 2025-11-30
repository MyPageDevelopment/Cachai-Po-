export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface Translation {
  original: string;
  translated: string;
  equivalences: { [key: string]: string };
}

export interface DictionaryEntry {
  id: string;
  word: string;
  translation: string;
  originCountry: Country;
  destinationCountry: Country;
}

export type Screen = 
  | "onboarding"
  | "voice-mode" 
  | "voice-recording" 
  | "text-mode" 
  | "results" 
  | "country-selector"
  | "dictionary"
  | "add-word"
  | "settings";

export interface CountrySelectorProps {
  selecting: "origin" | "destination";
}

export interface UserSettings {
  name: string;
  originCountry: Country;
  email: string;
  realtimeTranslation: boolean;
  readingSpeed: "slow" | "normal" | "fast";
  darkMode: boolean;
  language: "es" | "en";
}
