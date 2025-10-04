"use client";

import { Keyboard } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-center py-4 md:py-6 w-full">
      <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-3xl font-bold">TypeRush</span>
      </Link>
    </header>
  );
};

export default Header;
