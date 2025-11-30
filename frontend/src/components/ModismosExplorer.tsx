import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "./BottomNav";
import { Search, Book } from "lucide-react";
import { api } from "@/lib/api";
import { Country } from "@/types";

interface ModismosExplorerProps {
  onBack: () => void;
  onNavigate: (screen: "voice-mode" | "dictionary" | "settings") => void;
  selectedCountry?: Country;
}

interface Modismo {
  palabraOrigen: string;
  paisOrigen: string;
  palabraDestino: string;
  paisDestino: string;
  contexto: string;
}

export function ModismosExplorer({
  onBack,
  onNavigate,
  selectedCountry,
}: ModismosExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [modismos, setModismos] = useState<Modismo[]>([]);
  const [filteredModismos, setFilteredModismos] = useState<Modismo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"country" | "search">("country");

  const loadCountryModismos = async () => {
    if (!selectedCountry) return;
    
    setIsLoading(true);
    try {
      const data = await api.getModismosByCountry(selectedCountry.code);
      setModismos(data);
      setFilteredModismos(data);
    } catch (error) {
      console.error("Error loading modismos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCountry && viewMode === "country") {
      loadCountryModismos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, viewMode]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredModismos(modismos);
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.searchModismos(searchQuery);
      setFilteredModismos(data);
      setViewMode("search");
    } catch (error) {
      console.error("Error searching modismos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const groupedModismos = filteredModismos.reduce((acc, modismo) => {
    const key = modismo.palabraOrigen;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(modismo);
    return acc;
  }, {} as Record<string, Modismo[]>);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Explorar Modismos" onBack={onBack} />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-6 pb-24 overflow-y-auto">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar modismo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-9"
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "..." : "Buscar"}
            </Button>
          </div>
          
          {selectedCountry && viewMode === "country" && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <span>{selectedCountry.flag}</span>
              <span>Mostrando modismos de {selectedCountry.name}</span>
            </div>
          )}
        </div>

        {/* Toggle View */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={viewMode === "country" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setViewMode("country");
              setSearchQuery("");
              if (selectedCountry) loadCountryModismos();
            }}
            disabled={!selectedCountry}
          >
            <Book className="h-4 w-4 mr-2" />
            Por País
          </Button>
          <Button
            variant={viewMode === "search" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("search")}
          >
            <Search className="h-4 w-4 mr-2" />
            Búsqueda
          </Button>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-16 text-muted-foreground">
            Cargando...
          </div>
        ) : filteredModismos.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            {viewMode === "country" && !selectedCountry
              ? "Selecciona un país para ver sus modismos"
              : "No se encontraron modismos"}
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedModismos).map(([word, translations]) => (
              <div
                key={word}
                className="p-5 rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="font-semibold text-lg mb-3">
                  {word}
                </div>
                <div className="space-y-2">
                  {translations.map((translation, idx) => (
                    <div
                      key={idx}
                      className="pl-4 border-l-2 border-primary/30"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{translation.palabraDestino}</span>
                        <span className="text-muted-foreground">
                          ({translation.paisOrigen} → {translation.paisDestino})
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {translation.contexto}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav
        activeScreen="dictionary"
        onNavigate={onNavigate}
      />
    </div>
  );
}
