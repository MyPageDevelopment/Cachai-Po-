import { Button } from "@/components/ui/button";

interface OnboardingProps {
  onStart: () => void;
  onSkip: () => void;
}

export function Onboarding({ onStart, onSkip }: OnboardingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 flex flex-col items-center justify-center px-6 relative">
      <button 
        onClick={onSkip}
        className="absolute top-6 right-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Saltar
      </button>
      
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Hero Emojis */}
        <div className="text-7xl mb-4 animate-[scaleIn_0.5s_ease-out]">
          🌎💬🗣️
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">
            ¡Bienvenido a Cachai Po'!
          </h1>
          <div className="space-y-2 text-lg text-muted-foreground">
            <p>Conecta con toda Latinoamérica</p>
            <p>Entiende y habla como un local</p>
            <p>Descubre modismos de cada país</p>
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-5 pt-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <span className="text-3xl">🎙️</span>
            <div className="text-left">
              <h3 className="font-semibold text-foreground mb-1">Traduce con tu voz</h3>
              <p className="text-sm text-muted-foreground">En segundos, sin escribir nada</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <span className="text-3xl">⌨️</span>
            <div className="text-left">
              <h3 className="font-semibold text-foreground mb-1">Escribe y traduce</h3>
              <p className="text-sm text-muted-foreground">Al instante, cualquier frase</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <span className="text-3xl">📚</span>
            <div className="text-left">
              <h3 className="font-semibold text-foreground mb-1">Guarda favoritos</h3>
              <p className="text-sm text-muted-foreground">Tu diccionario personal</p>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="pt-6">
          <Button 
            onClick={onStart}
            className="w-full h-14 text-lg font-semibold"
          >
            Comenzar
          </Button>
        </div>
      </div>
    </div>
  );
}
