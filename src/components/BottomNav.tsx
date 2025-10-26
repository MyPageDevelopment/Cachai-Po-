import { Button } from "@/components/ui/button";
import { BookOpen, Home, Settings } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: "voice-mode" | "dictionary") => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="max-w-lg mx-auto px-5 py-4 flex justify-around items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("dictionary")}
          className={activeScreen === "dictionary" ? "text-primary" : "text-muted-foreground"}
        >
          <BookOpen className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("voice-mode")}
          className={activeScreen.includes("voice") || activeScreen.includes("text") ? "text-primary" : "text-muted-foreground"}
        >
          <Home className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
