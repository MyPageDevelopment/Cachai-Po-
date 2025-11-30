import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { Square, ArrowRightLeft, Pause, Star } from "lucide-react";
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
  transcript?: string;
  interimTranscript?: string;
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
  transcript = "",
  interimTranscript = "",
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
            onClick={onSwapCountries}
            className="relative p-4 bg-gradient-to-br from-[hsl(4,75%,49%)] to-[hsl(4,100%,63%)] rounded-full shadow-[0_6px_20px_rgba(213,43,30,0.3)] hover:shadow-[0_8px_30px_rgba(213,43,30,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 group"
          >
            <div className="absolute inset-[-6px] rounded-full border-2 border-[hsl(217,100%,33%)] opacity-20 group-hover:opacity-40 transition-opacity" />
            <ArrowRightLeft className="w-6 h-6 text-white" />
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
            <div className="mb-4 px-4 py-2 rounded-full bg-[hsl(4,75%,49%)]/20 border border-[hsl(4,75%,49%)]">
              <span className="text-sm font-medium text-[hsl(4,75%,49%)]">⚡ Traducción en Tiempo Real</span>
            </div>
          )}
          
          <p className="text-lg text-foreground mb-4">
            {realtimeMode ? "Traduciendo en vivo..." : "Grabando..."}
          </p>
          <p className="text-3xl font-mono font-bold text-[hsl(4,75%,49%)] mb-8">{formatTime(seconds)}</p>
          
          {/* Texto capturado */}
          {(transcript || interimTranscript) && (
            <div className="w-full max-w-md mb-8 p-6 bg-card rounded-2xl border-2 border-[hsl(217,100%,33%)]/20 shadow-lg">
              <p className="text-sm text-muted-foreground mb-2">📝 Texto capturado:</p>
              <p className="text-lg text-foreground leading-relaxed">
                {transcript}
                {interimTranscript && (
                  <span className="text-muted-foreground italic"> {interimTranscript}</span>
                )}
              </p>
            </div>
          )}
          
          {/* Wave Animation */}
          <div className="flex items-center gap-2 mb-8 h-16">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-[hsl(217,100%,33%)] rounded-full animate-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: "100%",
                }}
              />
            ))}
          </div>
          
          <button
            onClick={onStopRecording}
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(4,75%,49%)] to-[hsl(4,100%,63%)] shadow-[0_8px_30px_rgba(213,43,30,0.4)] hover:shadow-[0_12px_40px_rgba(213,43,30,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <div className="absolute inset-[-8px] rounded-full border-2 border-[hsl(217,100%,33%)] opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
            {realtimeMode ? (
              <Pause className="w-10 h-10 text-white mx-auto drop-shadow-lg" />
            ) : (
              <Square className="w-10 h-10 text-white mx-auto drop-shadow-lg" />
            )}
          </button>
        </div>
      </div>
      
      <BottomNav activeScreen="voice-recording" onNavigate={onNavigate} />
    </div>
  );
}
