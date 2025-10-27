import { Mic, MessageSquare } from "lucide-react";

interface HeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  icon?: "mic" | "text";
}

export function Header({ title, rightAction, icon }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-card to-primary/5 border-b border-border shadow-md">
      <div className="max-w-lg mx-auto px-5 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {icon === "mic" && <Mic className="w-6 h-6 text-primary animate-pulse-subtle" />}
          {icon === "text" && <MessageSquare className="w-6 h-6 text-primary animate-pulse-subtle" />}
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </header>
  );
}
