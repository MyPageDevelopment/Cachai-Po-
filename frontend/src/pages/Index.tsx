import { useState, useEffect } from "react";
import { VoiceMode } from "@/components/VoiceMode";
import { VoiceRecording } from "@/components/VoiceRecording";
import { TextMode } from "@/components/TextMode";
import { Results } from "@/components/Results";
import { CountrySelector } from "@/components/CountrySelector";
import { Dictionary } from "@/components/Dictionary";
import { AddWord } from "@/components/AddWord";
import { Onboarding } from "@/components/Onboarding";
import { Settings } from "@/components/Settings";
import { ModismosExplorer } from "@/components/ModismosExplorer";
import { Country, DictionaryEntry, Translation, Screen, UserSettings } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { api } from "@/lib/api";

const Index = () => {
  const { toast } = useToast();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [countries, setCountries] = useState<Country[]>([]);
  const [originCountry, setOriginCountry] = useState<Country | null>(null);
  const [destinationCountry, setDestinationCountry] = useState<Country | null>(null);
  const [selectingCountry, setSelectingCountry] = useState<"origin" | "destination" | null>(null);
  const [selectingFor, setSelectingFor] = useState<"main" | "settings">("main");
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [dictionaryEntries, setDictionaryEntries] = useState<DictionaryEntry[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModismosExplorer, setShowModismosExplorer] = useState(false);
  const [userId] = useState(() => {
    // Generar o recuperar userId del localStorage
    let id = localStorage.getItem("userId");
    if (!id) {
      id = `user-${Date.now()}`;
      localStorage.setItem("userId", id);
    }
    return id;
  });
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "",
    originCountry: countries[0] || { code: "CL", name: "Chile", flag: "🇨🇱" },
    email: "",
    realtimeTranslation: false,
    readingSpeed: "normal",
    darkMode: false,
    language: "es",
  });

  // Hook de reconocimiento de voz
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    lang: originCountry?.code === 'CL' ? 'es-CL' : 
          originCountry?.code === 'MX' ? 'es-MX' :
          originCountry?.code === 'AR' ? 'es-AR' :
          originCountry?.code === 'ES' ? 'es-ES' : 'es-ES',
    continuous: true,
    interimResults: true,
    onError: (error) => {
      console.error('Speech recognition error:', error);
      if (error === 'not-allowed') {
        toast({
          title: "Permiso denegado",
          description: "Por favor permite el acceso al micrófono en tu navegador",
          variant: "destructive",
        });
      }
    },
  });

  // Cargar países desde la API
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await api.getCountries();
        setCountries(countriesData);
        if (countriesData.length > 0) {
          setOriginCountry(countriesData[0]); // Chile por defecto
          setDestinationCountry(countriesData[1]); // México por defecto
          setUserSettings(prev => ({ ...prev, originCountry: countriesData[0] }));
        }
      } catch (error) {
        console.error("Error loading countries:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los países",
          variant: "destructive",
        });
      }
    };
    loadCountries();
  }, [toast]);

  // Cargar diccionario del usuario
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const entries = await api.getDictionary(userId);
        setDictionaryEntries(entries);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      }
    };
    if (userId) {
      loadDictionary();
    }
  }, [userId]);

  // Cargar configuración del usuario
  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        const settings = await api.getUserSettings(userId);
        if (settings && originCountry) {
          setUserSettings({
            name: settings.name || "",
            originCountry: originCountry,
            email: settings.email || "",
            realtimeTranslation: settings.realtimeTranslation,
            readingSpeed: settings.readingSpeed as "slow" | "normal" | "fast",
            darkMode: settings.darkMode,
            language: settings.language as "es" | "en",
          });
        }
      } catch (error) {
        console.error("Error loading user settings:", error);
      }
    };
    if (userId && originCountry) {
      loadUserSettings();
    }
  }, [userId, originCountry]);

  useEffect(() => {
    // Check if user has seen onboarding
    const seen = localStorage.getItem("hasSeenOnboarding");
    if (seen === "true") {
      setHasSeenOnboarding(true);
      setScreen("voice-mode");
    }
  }, []);

  const handleStartOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnboarding(true);
    setScreen("voice-mode");
  };

  const handleSkipOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnboarding(true);
    setScreen("voice-mode");
  };
  
  const handleToggleMode = () => {
    setMode(mode === "voice" ? "text" : "voice");
    setScreen(mode === "voice" ? "text-mode" : "voice-mode");
  };
  
  const handleSwapCountries = () => {
    const temp = originCountry;
    setOriginCountry(destinationCountry);
    setDestinationCountry(temp);
  };
  
  
  const handleSelectCountry = (country: Country) => {
    if (selectingFor === "settings") {
      setUserSettings({ ...userSettings, originCountry: country });
      setOriginCountry(country);
      setSelectingCountry(null);
      setScreen("settings");
    } else {
      if (selectingCountry === "origin") {
        setOriginCountry(country);
      } else if (selectingCountry === "destination") {
        setDestinationCountry(country);
      }
      setSelectingCountry(null);
      setScreen(mode === "voice" ? "voice-mode" : "text-mode");
    }
  };
  
  const handleStartRecording = () => {
    if (!isSupported) {
      toast({
        title: "No soportado",
        description: "Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.",
        variant: "destructive",
      });
      return;
    }

    resetTranscript();
    startListening();
    setIsRecording(true);
    setScreen("voice-recording");
  };
  
  const handleStopRecording = async () => {
    stopListening();
    setIsRecording(false);
    
    // Esperar un momento para que se capture el texto final
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const capturedText = transcript.trim();
    
    if (!capturedText) {
      toast({
        title: "No se detectó voz",
        description: "Intenta hablar más cerca del micrófono",
        variant: "destructive",
      });
      setScreen("voice-mode");
      return;
    }

    setIsLoading(true);
    
    try {
      if (originCountry && destinationCountry) {
        const result = await api.translate(
          originCountry.code,
          destinationCountry.code,
          capturedText
        );
        setTranslation(result);
        setScreen("results");
      }
    } catch (error) {
      console.error("Error translating:", error);
      toast({
        title: "Error",
        description: "No se pudo traducir el texto",
        variant: "destructive",
      });
      setScreen("voice-mode");
    } finally {
      setIsLoading(false);
      resetTranscript();
    }
  };
  
  const handleTranslate = async (text: string) => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un texto para traducir",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (originCountry && destinationCountry) {
        const result = await api.translate(
          originCountry.code,
          destinationCountry.code,
          text
        );
        setTranslation(result);
        setScreen("results");
      }
    } catch (error) {
      console.error("Error translating:", error);
      toast({
        title: "Error",
        description: "No se pudo traducir el texto",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNewTranslation = () => {
    setTranslation(null);
    setScreen(mode === "voice" ? "voice-mode" : "text-mode");
  };
  
  const handleSaveToDictionary = async (entry: Omit<DictionaryEntry, "id">) => {
    try {
      const newEntry = await api.addToDictionary({
        userId,
        word: entry.word,
        translation: entry.translation,
        originCountryCode: entry.originCountry.code,
        originCountryName: entry.originCountry.name,
        originCountryFlag: entry.originCountry.flag,
        destinationCountryCode: entry.destinationCountry.code,
        destinationCountryName: entry.destinationCountry.name,
        destinationCountryFlag: entry.destinationCountry.flag,
      });
      
      setDictionaryEntries([...dictionaryEntries, {
        id: newEntry.id,
        word: newEntry.word,
        translation: newEntry.translation,
        originCountry: {
          code: newEntry.originCountryCode,
          name: newEntry.originCountryName,
          flag: newEntry.originCountryFlag,
        },
        destinationCountry: {
          code: newEntry.destinationCountryCode,
          name: newEntry.destinationCountryName,
          flag: newEntry.destinationCountryFlag,
        },
      }]);
      
      toast({
        title: "Palabra guardada",
        description: "La palabra se agregó a tu diccionario",
      });
    } catch (error) {
      console.error("Error saving to dictionary:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la palabra",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteEntry = async (id: string) => {
    try {
      await api.deleteFromDictionary(id);
      setDictionaryEntries(dictionaryEntries.filter((entry) => entry.id !== id));
      toast({
        title: "Palabra eliminada",
        description: "La palabra se eliminó de tu diccionario",
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la palabra",
        variant: "destructive",
      });
    }
  };
  
  
  const handleNavigate = (targetScreen: "voice-mode" | "dictionary" | "settings") => {
    if (targetScreen === "voice-mode") {
      setMode("voice");
      setScreen("voice-mode");
    } else if (targetScreen === "settings") {
      setScreen("settings");
    } else {
      setScreen("dictionary");
    }
  };

  const handleSelectCountryFromSettings = () => {
    setSelectingFor("settings");
    setSelectingCountry("origin");
    setScreen("country-selector");
  };

  const handleUpdateSettings = async (newSettings: UserSettings) => {
    setUserSettings(newSettings);
    
    // Guardar en el backend
    try {
      await api.saveUserSettings({
        userId,
        name: newSettings.name,
        originCountryCode: newSettings.originCountry.code,
        originCountryName: newSettings.originCountry.name,
        originCountryFlag: newSettings.originCountry.flag,
        email: newSettings.email,
        realtimeTranslation: newSettings.realtimeTranslation,
        readingSpeed: newSettings.readingSpeed,
        darkMode: newSettings.darkMode,
        language: newSettings.language,
      });
      
      toast({
        title: "Configuración guardada",
        description: "Tus preferencias se guardaron correctamente",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración",
        variant: "destructive",
      });
    }
  };
  
  // Render onboarding
  if (!hasSeenOnboarding && screen === "onboarding") {
    return (
      <Onboarding
        onStart={handleStartOnboarding}
        onSkip={handleSkipOnboarding}
      />
    );
  }

  // Loading state mientras se cargan los países
  if (!originCountry || !destinationCountry || countries.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }
  
  
  // Render appropriate screen
  if (selectingCountry) {
    return (
      <CountrySelector
        selecting={selectingCountry}
        currentCountry={selectingCountry === "origin" ? originCountry : destinationCountry}
        countries={countries}
        onSelect={handleSelectCountry}
        onBack={() => {
          setSelectingCountry(null);
          if (selectingFor === "settings") {
            setScreen("settings");
          } else {
            setScreen(mode === "voice" ? "voice-mode" : "text-mode");
          }
        }}
      />
    );
  }
  
  
  if (screen === "voice-mode") {
    return (
      <VoiceMode
        originCountry={originCountry}
        destinationCountry={destinationCountry}
        onToggleMode={handleToggleMode}
        onSelectOrigin={() => {
          setSelectingFor("main");
          setSelectingCountry("origin");
          setScreen("country-selector");
        }}
        onSelectDestination={() => {
          setSelectingFor("main");
          setSelectingCountry("destination");
          setScreen("country-selector");
        }}
        onSwapCountries={handleSwapCountries}
        onStartRecording={handleStartRecording}
        onNavigate={handleNavigate}
        realtimeMode={userSettings.realtimeTranslation}
      />
    );
  }
  
  
  if (screen === "voice-recording") {
    return (
      <VoiceRecording
        originCountry={originCountry}
        destinationCountry={destinationCountry}
        onSelectOrigin={() => {
          setSelectingFor("main");
          setSelectingCountry("origin");
          setScreen("country-selector");
        }}
        onSelectDestination={() => {
          setSelectingFor("main");
          setSelectingCountry("destination");
          setScreen("country-selector");
        }}
        onSwapCountries={handleSwapCountries}
        onStopRecording={handleStopRecording}
        onNavigate={handleNavigate}
        realtimeMode={userSettings.realtimeTranslation}
        transcript={transcript}
        interimTranscript={interimTranscript}
      />
    );
  }
  
  
  if (screen === "text-mode") {
    return (
      <TextMode
        originCountry={originCountry}
        destinationCountry={destinationCountry}
        onToggleMode={handleToggleMode}
        onSelectOrigin={() => {
          setSelectingFor("main");
          setSelectingCountry("origin");
          setScreen("country-selector");
        }}
        onSelectDestination={() => {
          setSelectingFor("main");
          setSelectingCountry("destination");
          setScreen("country-selector");
        }}
        onSwapCountries={handleSwapCountries}
        onTranslate={handleTranslate}
        onNavigate={handleNavigate}
      />
    );
  }
  
  if (screen === "results" && translation) {
    return (
      <Results
        translation={translation}
        originCountry={originCountry}
        destinationCountry={destinationCountry}
        onNewTranslation={handleNewTranslation}
        onSaveToDictionary={handleSaveToDictionary}
        onNavigate={handleNavigate}
      />
    );
  }
  
  if (showModismosExplorer) {
    return (
      <ModismosExplorer
        onBack={() => setShowModismosExplorer(false)}
        onNavigate={handleNavigate}
        selectedCountry={originCountry || undefined}
      />
    );
  }
  
  if (screen === "dictionary") {
    return (
      <Dictionary
        entries={dictionaryEntries}
        onAddWord={() => setScreen("add-word")}
        onDeleteEntry={handleDeleteEntry}
        onChangeNationality={() => {
          setSelectingFor("main");
          setSelectingCountry("origin");
          setScreen("country-selector");
        }}
        onNavigate={handleNavigate}
        onExploreModismos={() => setShowModismosExplorer(true)}
      />
    );
  }
  
  if (screen === "settings") {
    return (
      <Settings
        settings={userSettings}
        onUpdateSettings={handleUpdateSettings}
        onNavigate={handleNavigate}
        onSelectCountry={handleSelectCountryFromSettings}
      />
    );
  }
  
  if (screen === "add-word") {
    return (
      <div>
        <Dictionary
          entries={dictionaryEntries}
          onAddWord={() => {}}
          onDeleteEntry={handleDeleteEntry}
          onChangeNationality={() => {}}
          onNavigate={handleNavigate}
        />
        <AddWord
          onSave={(entry) => {
            handleSaveToDictionary(entry);
            setScreen("dictionary");
          }}
          onCancel={() => setScreen("dictionary")}
        />
      </div>
    );
  }
  
  return null;
};

export default Index;
