import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { Mic, ArrowLeftRight } from "lucide-react";
import { Country } from "@/types";

interface VoiceModeProps {
  originCountry: Country;
  destinationCountry: Country;
  onToggleMode: () => void;
  onSelectOrigin: () => void;
  onSelectDestination: () => void;
  onSwapCountries: () => void;
  onStartRecording: () => void;
  onNavigate: (screen: "voice-mode" | "dictionary") => void;
}

export function VoiceMode({
  originCountry,
  destinationCountry,
  onToggleMode,
  onSelectOrigin,
  onSelectDestination,
  onSwapCountries,
  onStartRecording,
  onNavigate,
}: VoiceModeProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title="Modo Voz"
        rightAction={
          <Button variant="outline" size="sm" onClick={onToggleMode}>
            Modo Texto
          </Button>
        }
      />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-8 flex flex-col">
        {/* Country Selector */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={onSelectOrigin}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:shadow-md transition-all active:scale-95"
          >
            <span className="text-5xl">{originCountry.flag}</span>
            <span className="text-sm font-medium text-foreground">{originCountry.name}</span>
          </button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onSwapCountries}
            className="rounded-full"
          >
            <ArrowLeftRight className="w-6 h-6 text-primary" />
          </Button>
          
          <button
            onClick={onSelectDestination}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:shadow-md transition-all active:scale-95"
          >
            <span className="text-5xl">{destinationCountry.flag}</span>
            <span className="text-sm font-medium text-foreground">{destinationCountry.name}</span>
          </button>
        </div>
        
        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Presiona grabar para comenzar
          </p>
          
          <Button
            variant="circular"
            onClick={onStartRecording}
            className="mb-4"
          >
            <Mic className="w-8 h-8" />
          </Button>
        </div>
      </div>
      
      <BottomNav activeScreen="voice-mode" onNavigate={onNavigate} />
    </div>
  );
}
