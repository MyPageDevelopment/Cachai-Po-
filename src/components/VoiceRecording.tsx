import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { Square, ArrowLeftRight, Pause } from "lucide-react";
import { Country } from "@/types";
import { useEffect, useState } from "react";

interface VoiceRecordingProps {
  originCountry: Country;
  destinationCountry: Country;
  onSelectOrigin: () => void;
  onSelectDestination: () => void;
  onSwapCountries: () => void;
  onStopRecording: () => void;
  onNavigate: (screen: "voice-mode" | "dictionary" | "settings") => void;
  realtimeMode?: boolean;
}

export function VoiceRecording({
  originCountry,
  destinationCountry,
  onSelectOrigin,
  onSelectDestination,
  onSwapCountries,
  onStopRecording,
  onNavigate,
  realtimeMode = false,
}: VoiceRecordingProps) {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Modo Voz" />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-8 flex flex-col">
        {/* Country Selector */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={onSelectOrigin}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border-2 border-border hover:border-primary hover-lift transition-all shadow-md"
          >
            <span className="text-6xl">{originCountry.flag}</span>
            <span className="text-sm font-medium text-foreground">{originCountry.name}</span>
          </button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onSwapCountries}
            className="rounded-full w-14 h-14"
          >
            <ArrowLeftRight className="w-7 h-7 text-primary" />
          </Button>
          
          <button
            onClick={onSelectDestination}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border-2 border-border hover:border-secondary hover-lift transition-all shadow-md"
          >
            <span className="text-6xl">{destinationCountry.flag}</span>
            <span className="text-sm font-medium text-foreground">{destinationCountry.name}</span>
          </button>
        </div>
        
        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {realtimeMode && (
            <div className="mb-4 px-4 py-2 rounded-full bg-primary/20 border border-primary">
              <span className="text-sm font-medium text-primary">⚡ Traducción en Tiempo Real</span>
            </div>
          )}
          
          <p className="text-lg text-foreground mb-4">
            {realtimeMode ? "Traduciendo en vivo..." : "Grabando..."}
          </p>
          <p className="text-3xl font-mono font-bold text-primary mb-8">{formatTime(seconds)}</p>
          
          {/* Wave Animation */}
          <div className="flex items-center gap-2 mb-8 h-16">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-secondary rounded-full animate-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: "100%",
                }}
              />
            ))}
          </div>
          
          <Button
            variant="circularRed"
            onClick={onStopRecording}
          >
            {realtimeMode ? <Pause className="w-8 h-8" /> : <Square className="w-8 h-8 fill-current" />}
          </Button>
        </div>
      </div>
      
      <BottomNav activeScreen="voice-recording" onNavigate={onNavigate} />
    </div>
  );
}
