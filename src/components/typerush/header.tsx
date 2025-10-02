"use client";

import { Keyboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-center py-4 md:py-6 w-full">
      <div className="flex items-center gap-3">
        <Keyboard className="w-8 h-8 text-accent" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-glow-accent select-none">
          TypeRush
        </h1>
      </div>
    </header>
  );
};

export default Header;
