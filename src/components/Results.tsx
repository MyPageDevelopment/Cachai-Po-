import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { Translation, Country, DictionaryEntry } from "@/types";

interface ResultsProps {
  translation: Translation;
  originCountry: Country;
  destinationCountry: Country;
  onNewTranslation: () => void;
  onSaveToDictionary: (entry: Omit<DictionaryEntry, "id">) => void;
  onNavigate: (screen: "voice-mode" | "dictionary" | "settings") => void;
}

export function Results({
  translation,
  originCountry,
  destinationCountry,
  onNewTranslation,
  onSaveToDictionary,
  onNavigate,
}: ResultsProps) {
  const handleSave = () => {
    // Save the first equivalence pair to dictionary
    const firstKey = Object.keys(translation.equivalences)[0];
    if (firstKey) {
      onSaveToDictionary({
        word: firstKey,
        translation: translation.equivalences[firstKey],
        originCountry,
        destinationCountry,
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Resultados" />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-6 pb-24 space-y-4 overflow-auto">
        {/* Voice to Text Card */}
        <div className="p-6 rounded-2xl bg-secondary text-secondary-foreground shadow-md animate-[fadeIn_0.3s_ease-out] opacity-0" style={{ animationFillMode: 'forwards' }}>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">Voz a texto</h3>
          <p className="text-lg">{translation.original}</p>
        </div>
        
        {/* Translation Card */}
        <div className="p-6 rounded-2xl bg-primary text-primary-foreground shadow-md animate-[fadeIn_0.3s_ease-out_0.1s] opacity-0" style={{ animationFillMode: 'forwards' }}>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">Traducción</h3>
          <p className="text-lg">{translation.translated}</p>
        </div>
        
        {/* Equivalences Card */}
        <div className="p-6 rounded-2xl bg-accent text-accent-foreground shadow-md animate-[fadeIn_0.3s_ease-out_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">Equivalencias</h3>
          <div className="space-y-2">
            {Object.entries(translation.equivalences).map(([key, value], index) => (
              <div key={index} className="flex items-center gap-2 text-base">
                <span className="font-medium">{key}</span>
                <span>→</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button onClick={onNewTranslation} className="w-full">
            Nueva traducción
          </Button>
          
          <Button onClick={handleSave} variant="outline" className="w-full">
            Guardar en diccionario
          </Button>
        </div>
      </div>
      
      <BottomNav activeScreen="results" onNavigate={onNavigate} />
    </div>
  );
}
