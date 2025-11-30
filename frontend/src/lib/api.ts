const API_BASE_URL = '/api';

export const api = {
  // Countries
  getCountries: async () => {
    const response = await fetch(`${API_BASE_URL}/countries`);
    return response.json();
  },

  // Translations
  translate: async (originCountryCode: string, destinationCountryCode: string, text: string) => {
    const response = await fetch(`${API_BASE_URL}/translations/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        originCountryCode,
        destinationCountryCode,
        text,
      }),
    });
    return response.json();
  },

  getTranslations: async () => {
    const response = await fetch(`${API_BASE_URL}/translations`);
    return response.json();
  },

  // Dictionary
  getDictionary: async (userId?: string) => {
    const url = userId 
      ? `${API_BASE_URL}/dictionary/user/${userId}`
      : `${API_BASE_URL}/dictionary`;
    const response = await fetch(url);
    return response.json();
  },

  addToDictionary: async (entry: {
    userId?: string;
    word: string;
    translation: string;
    originCountryCode: string;
    originCountryName: string;
    originCountryFlag: string;
    destinationCountryCode: string;
    destinationCountryName: string;
    destinationCountryFlag: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/dictionary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  },

  deleteFromDictionary: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/dictionary/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // User Settings
  getUserSettings: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/user-settings/${userId}`);
    return response.json();
  },

  saveUserSettings: async (settings: {
    userId: string;
    name?: string;
    originCountryCode: string;
    originCountryName: string;
    originCountryFlag: string;
    email?: string;
    realtimeTranslation?: boolean;
    readingSpeed?: string;
    darkMode?: boolean;
    language?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/user-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    return response.json();
  },

  // Seed countries (for initial setup)
  seedCountries: async () => {
    const response = await fetch(`${API_BASE_URL}/countries/seed`, {
      method: 'POST',
    });
    return response.json();
  },

  // Modismos - New endpoints
  searchModismos: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/translations/search?q=${encodeURIComponent(query)}`);
    return response.json();
  },

  getModismosByCountry: async (countryCode: string) => {
    const response = await fetch(`${API_BASE_URL}/translations/country/${countryCode}`);
    return response.json();
  },

  getWordTranslations: async (word: string, country: string) => {
    const response = await fetch(`${API_BASE_URL}/translations/word/${encodeURIComponent(word)}/${country}`);
    return response.json();
  },
};
