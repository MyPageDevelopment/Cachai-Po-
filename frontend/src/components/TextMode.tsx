import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { ArrowRightLeft, Mic, Star } from "lucide-react";
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
  
  const handleSwapCountries = () => {
    onSwapCountries();
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="Modo Texto"
        icon="text"
        showChileanFlag={true}
        rightAction={
          <Button 
            variant="outline" 
            size="sm"
            onClick={onToggleMode}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            <Mic className="w-4 h-4 mr-1" />
            Modo Voz
          </Button>
        }
      />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-8 flex flex-col">
        {/* Country Selector */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={onSelectOrigin}
            className={`relative flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover-lift min-w-[140px] ${
              originCountry.code === 'CL' 
                ? 'border-2 border-[hsl(4,75%,49%)] shadow-[0_4px_12px_rgba(213,43,30,0.15)]' 
                : 'border border-border hover:border-[hsl(217,100%,33%)]'
            }`}
          >
            {originCountry.code === 'CL' && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-[hsl(217,100%,33%)] rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            )}
            <span className="text-5xl">{originCountry.flag}</span>
            <span className="text-sm font-medium text-foreground">{originCountry.name}</span>
          </button>

          <button
            onClick={handleSwapCountries}
            className="relative p-4 bg-gradient-to-br from-[hsl(4,75%,49%)] to-[hsl(4,100%,63%)] rounded-full shadow-[0_6px_20px_rgba(213,43,30,0.3)] hover:shadow-[0_8px_30px_rgba(213,43,30,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 group"
          >
            <div className="absolute inset-[-6px] rounded-full border-2 border-[hsl(217,100%,33%)] opacity-20 group-hover:opacity-40 transition-opacity" />
            <ArrowRightLeft className="w-6 h-6 text-white animate-rotate-swap" />
          </button>

          <button
            onClick={onSelectDestination}
            className={`relative flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover-lift min-w-[140px] ${
              destinationCountry.code === 'CL' 
                ? 'border-2 border-[hsl(4,75%,49%)] shadow-[0_4px_12px_rgba(213,43,30,0.15)]' 
                : 'border border-border hover:border-[hsl(217,100%,33%)]'
            }`}
          >
            {destinationCountry.code === 'CL' && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-[hsl(217,100%,33%)] rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            )}
            <span className="text-5xl">{destinationCountry.flag}</span>
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
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-br from-[hsl(4,75%,49%)] to-[hsl(4,100%,63%)] text-white shadow-[0_4px_20px_rgba(213,43,30,0.3)] hover:shadow-[0_6px_30px_rgba(213,43,30,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Traducir
          </Button>
        </div>
      </div>
      
      <BottomNav activeScreen="text-mode" onNavigate={onNavigate} />
    </div>
  );
}
