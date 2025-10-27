import { Mic, MessageSquare, Star } from "lucide-react";

interface HeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  icon?: "mic" | "text";
  showChileanFlag?: boolean;
}

export function Header({ title, rightAction, icon, showChileanFlag = false }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[hsl(217,100%,33%)] to-[hsl(217,91%,60%)] border-b border-secondary/20 shadow-lg">
      <div className="max-w-lg mx-auto px-5 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {showChileanFlag && (
            <div className="w-7 h-7 relative flex-shrink-0">
              <div className="absolute top-0 left-0 w-3.5 h-3.5 bg-[hsl(217,100%,33%)] flex items-center justify-center rounded-tl-md">
                <Star className="w-2 h-2 text-white fill-white" />
              </div>
              <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-white rounded-tr-md" />
              <div className="absolute bottom-0 left-0 w-7 h-3.5 bg-[hsl(4,75%,49%)] rounded-b-md" />
            </div>
          )}
          {icon === "mic" && <Mic className="w-6 h-6 text-white animate-pulse-subtle drop-shadow-lg" />}
          {icon === "text" && <MessageSquare className="w-6 h-6 text-white animate-pulse-subtle drop-shadow-lg" />}
          <h1 className="text-2xl font-bold text-white drop-shadow-md">{title}</h1>
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </header>
  );
}
