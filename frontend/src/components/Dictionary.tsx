import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./BottomNav";
import { Plus, Trash2, Book } from "lucide-react";
import { DictionaryEntry } from "@/types";

interface DictionaryProps {
  entries: DictionaryEntry[];
  onAddWord: () => void;
  onDeleteEntry: (id: string) => void;
  onChangeNationality: () => void;
  onNavigate: (screen: "voice-mode" | "dictionary" | "settings") => void;
  onExploreModismos?: () => void;
}

export function Dictionary({
  entries,
  onAddWord,
  onDeleteEntry,
  onChangeNationality,
  onNavigate,
  onExploreModismos,
}: DictionaryProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Mi Diccionario" />
      
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-6 pb-24">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            onClick={onChangeNationality}
          >
            Cambiar nacionalidad
          </Button>
          {onExploreModismos && (
            <Button
              variant="outline"
              onClick={onExploreModismos}
            >
              <Book className="w-4 h-4 mr-2" />
              Explorar Modismos
            </Button>
          )}
        </div>
        
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-center mb-8">
              No tienes palabras guardadas aún
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <span>{entry.originCountry.flag}</span>
                    <span>{entry.word}</span>
                    <span className="text-muted-foreground">→</span>
                    <span>{entry.destinationCountry.flag}</span>
                    <span>{entry.translation}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteEntry(entry.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {/* Floating Add Button */}
        <Button
          variant="circular"
          onClick={onAddWord}
          className="fixed bottom-24 right-8 shadow-2xl"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>
      
      <BottomNav activeScreen="dictionary" onNavigate={onNavigate} />
    </div>
  );
}
