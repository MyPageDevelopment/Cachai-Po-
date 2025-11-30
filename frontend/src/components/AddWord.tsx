import { Button } from "@/components/ui/button";
import { Country, DictionaryEntry } from "@/types";
import { countries } from "@/data/countries";
import { useState } from "react";
import { X } from "lucide-react";

interface AddWordProps {
  onSave: (entry: Omit<DictionaryEntry, "id">) => void;
  onCancel: () => void;
}

export function AddWord({ onSave, onCancel }: AddWordProps) {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [originCountry, setOriginCountry] = useState<Country>(countries[0]);
  const [destinationCountry, setDestinationCountry] = useState<Country>(countries[1]);
  
  const handleSave = () => {
    if (word && translation) {
      onSave({
        word,
        translation,
        originCountry,
        destinationCountry,
      });
    }
  };
  
  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-5 z-50 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-6 animate-[scaleIn_0.2s_ease-out]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Agregar palabra</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Palabra
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingresa una palabra"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              País origen
            </label>
            <select
              value={originCountry.code}
              onChange={(e) => {
                const country = countries.find((c) => c.code === e.target.value);
                if (country) setOriginCountry(country);
              }}
              className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              País destino
            </label>
            <select
              value={destinationCountry.code}
              onChange={(e) => {
                const country = countries.find((c) => c.code === e.target.value);
                if (country) setDestinationCountry(country);
              }}
              className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Traducción
            </label>
            <input
              type="text"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingresa la traducción"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="flex-1" disabled={!word || !translation}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
