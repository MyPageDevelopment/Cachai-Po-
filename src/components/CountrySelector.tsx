import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { countries } from "@/data/countries";
import { Country } from "@/types";

interface CountrySelectorProps {
  selecting: "origin" | "destination";
  currentCountry: Country;
  onSelect: (country: Country) => void;
  onBack: () => void;
}

export function CountrySelector({ selecting, currentCountry, onSelect, onBack }: CountrySelectorProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Selecciona una nacionalidad"
        rightAction={
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
        }
      />
      
      <div className="max-w-lg mx-auto px-5 py-6 pb-24 space-y-3">
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => onSelect(country)}
            className={`w-full p-5 rounded-2xl bg-card border-2 transition-all hover:shadow-md active:scale-98 flex items-center gap-4 ${
              currentCountry.code === country.code ? "border-primary shadow-md" : "border-border"
            }`}
          >
            <span className="text-4xl">{country.flag}</span>
            <span className="text-lg font-medium text-foreground flex-1 text-left">{country.name}</span>
            {currentCountry.code === country.code && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              </div>
            )}
          </button>
        ))}
        
        <Button onClick={onBack} className="w-full mt-6">
          Confirmar
        </Button>
      </div>
    </div>
  );
}
