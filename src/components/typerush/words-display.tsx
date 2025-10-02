"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from 'react';

type WordsDisplayProps = {
  words: string;
  typed: string;
  totalTyped: number;
};

const Character = React.memo(({ char, state }: { char: string, state: 'correct' | 'incorrect' | 'untyped' | 'cursor' }) => {
  return (
    <span
      className={cn("font-mono text-2xl md:text-3xl transition-colors duration-150", {
        "text-primary": state === "correct",
        "text-red-500": state === "incorrect",
        "text-muted-foreground": state === "untyped",
        "relative": state === "cursor",
      })}
    >
      {state === 'cursor' && (
        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent animate-pulse" />
      )}
      {char}
    </span>
  );
});
Character.displayName = "Character";

const WordsDisplay = ({ words, typed }: WordsDisplayProps) => {
  const characters = useMemo(() => {
    return words.split('').map((char, index) => {
      if (index < typed.length) {
        return { char, state: char === typed[index] ? 'correct' : 'incorrect' };
      } else if (index === typed.length) {
        return { char, state: 'cursor' };
      } else {
        return { char, state: 'untyped' };
      }
    });
  }, [words, typed]);

  return (
    <div className="w-full h-full p-4 md:p-6 bg-black/20 rounded-lg overflow-hidden leading-relaxed tracking-wider select-none border border-white/10 flex items-center justify-center">
      <p className="text-center">
        {characters.map((item, index) => (
          <Character key={index} char={item.char} state={item.state as any} />
        ))}
      </p>
    </div>
  );
};

export default WordsDisplay;
