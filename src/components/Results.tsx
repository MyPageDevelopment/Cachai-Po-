import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { Translation, Country, DictionaryEntry } from "@/types";
import { Mic, Languages, BookOpen, ArrowRight, RotateCcw, Save } from "lucide-react";

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

  const equivalences = Object.entries(translation.equivalences).map(([key, value]) => ({
    original: key,
    translated: value,
  }));
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Resultados" />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-6 pb-24 overflow-auto">
      <div className="space-y-4 mb-6">
        <div className="bg-white border-t-4 border-[hsl(4,75%,49%)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Mic className="w-5 h-5 text-[hsl(4,75%,49%)]" />
            Voz a texto
          </h3>
          <p className="text-foreground/90 text-base leading-relaxed">{translation.original}</p>
        </div>

        <div className="bg-white border-t-4 border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Languages className="w-5 h-5 text-foreground" />
            Traducción
          </h3>
          <p className="text-foreground/90 text-base leading-relaxed">{translation.translated}</p>
        </div>

        <div className="bg-white border-t-4 border-[hsl(217,100%,33%)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[hsl(217,100%,33%)]" />
            Equivalencias
          </h3>
          <div className="space-y-3">
            {equivalences.map((eq, index) => (
              <div key={index} className="flex items-center gap-3 bg-[hsl(217,100%,33%)]/5 rounded-xl p-3">
                <span className="font-medium text-[hsl(217,100%,33%)]">{eq.original}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="font-medium text-foreground">{eq.translated}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onNewTranslation}
          variant="outline"
          size="lg"
          className="flex-1 h-12 border-2 border-[hsl(217,100%,33%)] text-[hsl(217,100%,33%)] hover:bg-[hsl(217,100%,33%)]/10"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Nueva traducción
        </Button>
        
        <Button
          onClick={handleSave}
          size="lg"
          className="flex-1 h-12 bg-gradient-to-br from-[hsl(4,75%,49%)] to-[hsl(4,100%,63%)] text-white shadow-[0_4px_20px_rgba(213,43,30,0.3)] hover:shadow-[0_6px_30px_rgba(213,43,30,0.5)] hover:scale-105 active:scale-95 transition-all"
        >
          <Save className="w-5 h-5 mr-2" />
          Guardar
        </Button>
      </div>
      </div>
      
      <BottomNav activeScreen="results" onNavigate={onNavigate} />
    </div>
  );
}
