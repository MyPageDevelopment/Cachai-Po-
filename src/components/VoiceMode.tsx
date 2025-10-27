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
  onNavigate: (screen: "voice-mode" | "dictionary" | "settings") => void;
  realtimeMode?: boolean;
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
  realtimeMode = false,
}: VoiceModeProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title="Modo Voz"
        icon="mic"
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
        
        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {realtimeMode && (
            <div className="mb-6 px-5 py-2 rounded-full bg-primary/20 border border-primary animate-pulse-subtle">
              <span className="text-sm font-medium text-primary">⚡ Tiempo Real</span>
            </div>
          )}
          
          <p className="text-xl font-medium text-foreground mb-10 text-center px-4">
            {realtimeMode ? "🎙️ Toca el micrófono cuando estés listo" : "👋 ¡Habla claro y en voz alta!"}
          </p>
          
          <div className="relative mb-4">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse-subtle" />
            
            {/* Rotating ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-primary/30 animate-spin-slow" />
            
            {/* Main button */}
            <Button
              variant="circular"
              onClick={onStartRecording}
              className="relative w-24 h-24 bg-gradient-to-br from-primary to-primary/80 shadow-[0_8px_30px_rgba(249,219,93,0.4)] hover:shadow-[0_12px_40px_rgba(249,219,93,0.6)] active:scale-95 transition-all duration-300 animate-pulse-subtle"
            >
              <Mic className="w-10 h-10" />
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNav activeScreen="voice-mode" onNavigate={onNavigate} />
    </div>
  );
}
