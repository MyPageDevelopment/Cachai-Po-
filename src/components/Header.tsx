interface HeaderProps {
  title: string;
  rightAction?: React.ReactNode;
}

export function Header({ title, rightAction }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-lg mx-auto px-5 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </header>
  );
}
