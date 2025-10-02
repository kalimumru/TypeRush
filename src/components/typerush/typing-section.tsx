"use client";

import WordsDisplay from "./words-display";
import Keyboard from "./keyboard";
import type { GameState, UserStats } from "@/lib/types";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

type TypingSectionProps = {
  words: string;
  typed: string;
  totalTyped: number;
  lastPressedKey: string | null;
  stats: UserStats;
  onStart: () => void;
  state: GameState;
};

const TypingSection = ({
  words,
  typed,
  totalTyped,
  lastPressedKey,
  stats,
  onStart,
  state
}: TypingSectionProps) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-8 w-full p-4">
      <div className="relative w-full h-40">
        {state !== 'running' ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg z-10 animate-in fade-in">
             <h2 className="text-2xl font-headline text-glow-primary">Start Typing Test</h2>
             <p className="text-muted-foreground mb-4">Click the button to begin.</p>
             <Button size="lg" onClick={onStart} className="box-glow-primary">
               <Play className="mr-2" /> Start
             </Button>
           </div>
        ) : null}
        <WordsDisplay words={words} typed={typed} totalTyped={totalTyped} />
      </div>
      <Keyboard lastPressedKey={lastPressedKey} keyStats={stats.keyStats} />
    </div>
  );
};

export default TypingSection;
