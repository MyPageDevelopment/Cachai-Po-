import { useState } from "react";
import { VoiceMode } from "@/components/VoiceMode";
import { VoiceRecording } from "@/components/VoiceRecording";
import { TextMode } from "@/components/TextMode";
import { Results } from "@/components/Results";
import { CountrySelector } from "@/components/CountrySelector";
import { Dictionary } from "@/components/Dictionary";
import { AddWord } from "@/components/AddWord";
import { Country, DictionaryEntry, Translation, Screen } from "@/types";
import { countries, getTranslation } from "@/data/countries";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [screen, setScreen] = useState<Screen>("voice-mode");
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [originCountry, setOriginCountry] = useState<Country>(countries[0]); // Chile
  const [destinationCountry, setDestinationCountry] = useState<Country>(countries[1]); // Mexico
  const [selectingCountry, setSelectingCountry] = useState<"origin" | "destination" | null>(null);
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [dictionaryEntries, setDictionaryEntries] = useState<DictionaryEntry[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  
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
    if (selectingCountry === "origin") {
      setOriginCountry(country);
    } else if (selectingCountry === "destination") {
      setDestinationCountry(country);
    }
    setSelectingCountry(null);
    setScreen(mode === "voice" ? "voice-mode" : "text-mode");
  };
  
  const handleStartRecording = () => {
    setIsRecording(true);
    setScreen("voice-recording");
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate translation after 1 second
    setTimeout(() => {
      const sampleText = originCountry.code === "CL" ? "Está piola el carrete" : "No manches güey";
      const result = getTranslation(sampleText, originCountry.code, destinationCountry.code);
      setTranslation(result);
      setScreen("results");
    }, 1000);
  };
  
  const handleTranslate = (text: string) => {
    // Simulate translation
    setTimeout(() => {
      const result = getTranslation(text, originCountry.code, destinationCountry.code);
      setTranslation(result);
      setScreen("results");
    }, 500);
  };
  
  const handleNewTranslation = () => {
    setTranslation(null);
    setScreen(mode === "voice" ? "voice-mode" : "text-mode");
  };
  
  const handleSaveToDictionary = (entry: Omit<DictionaryEntry, "id">) => {
    const newEntry: DictionaryEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setDictionaryEntries([...dictionaryEntries, newEntry]);
    toast({
      title: "Palabra guardada",
      description: "La palabra se agregó a tu diccionario",
    });
  };
  
  const handleDeleteEntry = (id: string) => {
    setDictionaryEntries(dictionaryEntries.filter((entry) => entry.id !== id));
    toast({
      title: "Palabra eliminada",
      description: "La palabra se eliminó de tu diccionario",
    });
  };
  
  const handleNavigate = (targetScreen: "voice-mode" | "dictionary") => {
    if (targetScreen === "voice-mode") {
      setMode("voice");
      setScreen("voice-mode");
    } else {
      setScreen("dictionary");
    }
  };
  
  // Render appropriate screen
  if (selectingCountry) {
    return (
      <CountrySelector
        selecting={selectingCountry}
        currentCountry={selectingCountry === "origin" ? originCountry : destinationCountry}
        onSelect={handleSelectCountry}
        onBack={() => {
          setSelectingCountry(null);
          setScreen(mode === "voice" ? "voice-mode" : "text-mode");
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
          setSelectingCountry("origin");
          setScreen("country-selector");
        }}
        onSelectDestination={() => {
          setSelectingCountry("destination");
          setScreen("country-selector");
        }}
        onSwapCountries={handleSwapCountries}
        onStartRecording={handleStartRecording}
        onNavigate={handleNavigate}
      />
    );
  }
  
  if (screen === "voice-recording") {
    return (
      <VoiceRecording
        originCountry={originCountry}
        destinationCountry={destinationCountry}
        onSelectOrigin={() => {
          setSelectingCountry("origin");
          setScreen("country-selector");
        }}
        onSelectDestination={() => {
          setSelectingCountry("destination");
          setScreen("country-selector");
        }}
        onSwapCountries={handleSwapCountries}
        onStopRecording={handleStopRecording}
        onNavigate={handleNavigate}
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
          setSelectingCountry("origin");
          setScreen("country-selector");
        }}
        onSelectDestination={() => {
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
  
  if (screen === "dictionary") {
    return (
      <Dictionary
        entries={dictionaryEntries}
        onAddWord={() => setScreen("add-word")}
        onDeleteEntry={handleDeleteEntry}
        onChangeNationality={() => {
          setSelectingCountry("origin");
          setScreen("country-selector");
        }}
        onNavigate={handleNavigate}
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
