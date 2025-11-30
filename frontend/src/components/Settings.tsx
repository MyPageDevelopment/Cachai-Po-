import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { Switch } from "@/components/ui/switch";
import { UserSettings, Country } from "@/types";
import { countries } from "@/data/countries";
import { User, Globe, Info } from "lucide-react";

interface SettingsProps {
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
  onNavigate: (screen: "voice-mode" | "dictionary" | "settings") => void;
  onSelectCountry: () => void;
}

export function Settings({ settings, onUpdateSettings, onNavigate, onSelectCountry }: SettingsProps) {
  const handleToggleRealtime = (checked: boolean) => {
    onUpdateSettings({ ...settings, realtimeTranslation: checked });
  };

  const handleSpeedChange = (speed: "slow" | "normal" | "fast") => {
    onUpdateSettings({ ...settings, readingSpeed: speed });
  };

  const handleLanguageChange = (language: "es" | "en") => {
    onUpdateSettings({ ...settings, language });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Configuración" />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-6 pb-24 space-y-6 overflow-auto">
        
        {/* Perfil Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Perfil</h2>
          </div>
          
          <div className="p-5 rounded-2xl bg-card border border-border space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl">
                👤
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => onUpdateSettings({ ...settings, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                País de origen
              </label>
              <button
                onClick={onSelectCountry}
                className="w-full p-3 rounded-xl bg-background border border-border text-left flex items-center gap-2 hover:border-primary transition-colors"
              >
                <span className="text-2xl">{settings.originCountry.flag}</span>
                <span className="text-foreground">{settings.originCountry.name}</span>
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email (opcional)
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => onUpdateSettings({ ...settings, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@email.com"
              />
            </div>
          </div>
        </div>
        
        {/* Preferencias Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Preferencias</h2>
          </div>
          
          <div className="p-5 rounded-2xl bg-card border border-border space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">
                  Traducción en tiempo real
                </h3>
                <p className="text-sm text-muted-foreground">
                  Traduce mientras hablas sin presionar detener
                </p>
              </div>
              <Switch
                checked={settings.realtimeTranslation}
                onCheckedChange={handleToggleRealtime}
              />
            </div>
            
            <div className="border-t border-border pt-4">
              <label className="block text-sm font-medium text-foreground mb-3">
                Velocidad de lectura
              </label>
              <div className="flex gap-2">
                {(["slow", "normal", "fast"] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`flex-1 p-2 rounded-xl text-sm font-medium transition-all ${
                      settings.readingSpeed === speed
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {speed === "slow" ? "Lenta" : speed === "normal" ? "Normal" : "Rápida"}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <label className="block text-sm font-medium text-foreground mb-3">
                Idioma de interfaz
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange("es")}
                  className={`flex-1 p-2 rounded-xl text-sm font-medium transition-all ${
                    settings.language === "es"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground hover:border-primary"
                  }`}
                >
                  Español
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex-1 p-2 rounded-xl text-sm font-medium transition-all ${
                    settings.language === "en"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground hover:border-primary"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sobre la App Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Sobre la App</h2>
          </div>
          
          <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Versión</span>
              <span className="text-sm font-medium text-foreground">1.0.0</span>
            </div>
            
            <button className="w-full text-left p-3 rounded-xl hover:bg-accent transition-colors">
              <span className="text-sm text-foreground">Términos y condiciones</span>
            </button>
            
            <button className="w-full text-left p-3 rounded-xl hover:bg-accent transition-colors">
              <span className="text-sm text-foreground">Política de privacidad</span>
            </button>
          </div>
        </div>
        
        {/* Logout Button */}
        <Button variant="destructive" className="w-full">
          Cerrar sesión
        </Button>
      </div>
      
      <BottomNav activeScreen="settings" onNavigate={onNavigate} />
    </div>
  );
}
