import { Button } from "@/components/ui/button";
import { BookOpen, Home, Settings } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: "voice-mode" | "dictionary" | "settings") => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const isActive = (screen: string) => {
    if (screen === "home") {
      return activeScreen.includes("voice") || activeScreen.includes("text");
    }
    return activeScreen === screen;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="max-w-lg mx-auto px-5 py-3 flex justify-around items-center">
        <button
          onClick={() => onNavigate("dictionary")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
            isActive("dictionary")
              ? "text-[hsl(4,75%,49%)] bg-[hsl(4,75%,49%)]/10"
              : "text-muted-foreground hover:text-[hsl(217,100%,33%)]"
          }`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs font-medium">Diccionario</span>
        </button>
        
        <button
          onClick={() => onNavigate("voice-mode")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
            isActive("home")
              ? "text-[hsl(4,75%,49%)] bg-[hsl(4,75%,49%)]/10"
              : "text-muted-foreground hover:text-[hsl(217,100%,33%)]"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Inicio</span>
        </button>
        
        <button
          onClick={() => onNavigate("settings")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
            isActive("settings")
              ? "text-[hsl(4,75%,49%)] bg-[hsl(4,75%,49%)]/10"
              : "text-muted-foreground hover:text-[hsl(217,100%,33%)]"
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs font-medium">Ajustes</span>
        </button>
      </div>
    </div>
  );
}
