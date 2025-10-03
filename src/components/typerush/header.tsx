"use client";

import { Keyboard } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-center py-4 md:py-6 w-full">
      <Link href="/" className="flex items-center gap-3">
        <Keyboard className="w-8 h-8 text-primary" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground select-none">
          TypeRush
        </h1>
      </Link>
    </header>
  );
};

export default Header;
