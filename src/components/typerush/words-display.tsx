"use client";

import { cn } from "@/lib/utils";
import React, { useMemo, useEffect, useRef } from 'react';

type WordsDisplayProps = {
  words: string;
  typed: string;
  totalTyped: number;
};

const Character = React.memo(({ char, state, isCursor }: { char: string; state: 'correct' | 'incorrect' | 'untyped', isCursor: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isCursor && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [isCursor]);

  return (
    <span
      ref={isCursor ? ref : null}
      className={cn("font-mono text-2xl md:text-3xl transition-colors duration-150 relative", {
        "text-foreground": state === "correct",
        "text-destructive": state === "incorrect",
        "text-muted-foreground": state === "untyped",
      })}
    >
      {isCursor && (
        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary animate-pulse" />
      )}
      {char}
    </span>
  );
});
Character.displayName = "Character";

const WordsDisplay = ({ words, typed, totalTyped }: WordsDisplayProps) => {

  const characters = useMemo(() => {
    return words.split('').map((char, index) => {
      let state: 'correct' | 'incorrect' | 'untyped' = 'untyped';
      if (index < typed.length) {
        state = char === typed[index] ? 'correct' : 'incorrect';
      }
      return { char, state, isCursor: index === typed.length };
    });
  }, [words, typed]);

  return (
    <div className="w-full h-full p-4 md:p-6 rounded-lg overflow-hidden leading-relaxed tracking-wider select-none">
      <div className="text-left whitespace-pre-wrap">
        {characters.map((item, index) => (
          <Character key={index} char={item.char} state={item.state} isCursor={item.isCursor} />
        ))}
      </div>
    </div>
  );
};

export default WordsDisplay;
