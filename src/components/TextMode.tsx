import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { ArrowLeftRight } from "lucide-react";
import { Country } from "@/types";
import { useState } from "react";

interface TextModeProps {
  originCountry: Country;
  destinationCountry: Country;
  onToggleMode: () => void;
  onSelectOrigin: () => void;
  onSelectDestination: () => void;
  onSwapCountries: () => void;
  onTranslate: (text: string) => void;
  onNavigate: (screen: "voice-mode" | "dictionary" | "settings") => void;
}

export function TextMode({
  originCountry,
  destinationCountry,
  onToggleMode,
  onSelectOrigin,
  onSelectDestination,
  onSwapCountries,
  onTranslate,
  onNavigate,
}: TextModeProps) {
  const [text, setText] = useState("");
  
  const exampleText = originCountry.code === "MX" ? "No manches güey" : "Está piola el carrete";
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title="Modo Texto"
        icon="text"
        rightAction={
          <Button variant="outline" size="sm" onClick={onToggleMode}>
            Modo Voz
          </Button>
        }
      />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-8 flex flex-col">
        {/* Country Selector */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={onSelectOrigin}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border-2 border-border hover:border-primary hover-lift transition-all active:scale-95 shadow-md"
          >
            <span className="text-6xl">{originCountry.flag}</span>
            <span className="text-sm font-medium text-foreground">{originCountry.name}</span>
          </button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onSwapCountries}
            className="rounded-full hover:animate-bounce-gentle w-14 h-14"
          >
            <ArrowLeftRight className="w-7 h-7 text-primary" />
          </Button>
          
          <button
            onClick={onSelectDestination}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border-2 border-border hover:border-secondary hover-lift transition-all active:scale-95 shadow-md"
          >
            <span className="text-6xl">{destinationCountry.flag}</span>
            <span className="text-sm font-medium text-foreground">{destinationCountry.name}</span>
          </button>
        </div>
        
        {/* Text Input */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingresa un texto para comenzar"
            className="w-full h-48 p-5 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          />
          
          <p className="text-sm text-muted-foreground mb-6">
            Ejemplo: <span className="text-foreground font-medium">{exampleText}</span>
          </p>
          
          <Button
            onClick={() => onTranslate(text || exampleText)}
            disabled={!text && !exampleText}
            className="w-full"
          >
            Traducir
          </Button>
        </div>
      </div>
      
      <BottomNav activeScreen="text-mode" onNavigate={onNavigate} />
    </div>
  );
}
