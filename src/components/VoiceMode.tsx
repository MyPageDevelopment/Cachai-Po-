import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { Mic, ArrowRightLeft, MessageSquare, Star } from "lucide-react";
import { Country } from "@/types";
import { useState } from "react";

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
  const [showOriginSelector, setShowOriginSelector] = useState(false);
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);

  const handleSwapCountries = () => {
    onSwapCountries();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="Modo Voz"
        icon="mic"
        showChileanFlag={true}
        rightAction={
          <Button 
            variant="outline" 
            size="sm"
            onClick={onToggleMode}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Modo Texto
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
        
        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {realtimeMode && (
            <div className="mb-6 px-5 py-2 rounded-full bg-[hsl(4,75%,49%)]/20 border border-[hsl(4,75%,49%)] animate-pulse-subtle">
              <span className="text-sm font-medium text-[hsl(4,75%,49%)]">⚡ Tiempo Real</span>
            </div>
          )}
          
          <p className="text-xl font-medium text-foreground mb-10 text-center px-4">
            {realtimeMode ? "🎙️ Toca el micrófono cuando estés listo" : "👋 ¡Habla claro y en voz alta!"}
          </p>
          
          <button
            onClick={onStartRecording}
            className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[hsl(4,75%,49%)] to-[hsl(4,100%,63%)] shadow-[0_8px_30px_rgba(213,43,30,0.4),0_0_40px_rgba(213,43,30,0.2)] hover:shadow-[0_12px_40px_rgba(213,43,30,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-subtle group"
          >
            <div className="absolute inset-[-8px] rounded-full border-2 border-[hsl(217,100%,33%)] opacity-20 group-hover:opacity-40 transition-opacity" />
            <Mic className="w-12 h-12 text-white mx-auto drop-shadow-lg" />
          </button>
        </div>
      </div>
      
      <BottomNav activeScreen="voice-mode" onNavigate={onNavigate} />
    </div>
  );
}
