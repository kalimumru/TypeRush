"use client";

import WordsDisplay from "./words-display";
import Keyboard from "./keyboard";
import type { GameState, UserStats } from "@/lib/types";
import { Button } from "../ui/button";
import { Play, Timer } from "lucide-react";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TypingSectionProps = {
  words: string;
  typed: string;
  totalTyped: number;
  lastPressedKey: string | null;
  stats: UserStats;
  onStart: () => void;
  state: GameState;
  duration: number;
  onDurationChange: (duration: number) => void;
};

const TypingSection = ({
  words,
  typed,
  totalTyped,
  lastPressedKey,
  stats,
  onStart,
  state,
  duration,
  onDurationChange,
}: TypingSectionProps) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-8 w-full">
      <Card className="relative w-full h-48 shadow-sm border-none bg-card p-6">
        {state !== 'running' ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg z-10 animate-in fade-in">
             <h2 className="text-xl font-semibold text-foreground mb-2">Start Typing Test</h2>
             <p className="text-muted-foreground mb-6 text-sm">Select a duration and click start.</p>
             <div className="flex items-center gap-4">
                <Select
                    value={String(duration)}
                    onValueChange={(value) => onDurationChange(Number(value))}
                    disabled={state !== 'waiting'}
                >
                    <SelectTrigger className="w-[180px] bg-background">
                        <Timer className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="120">120 seconds</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={onStart}>
                    <Play className="mr-2 h-4 w-4" /> Start
                </Button>
            </div>
           </div>
        ) : null}
        <WordsDisplay words={words} typed={typed} totalTyped={totalTyped} />
      </Card>
      <Keyboard lastPressedKey={lastPressedKey} keyStats={stats.keyStats} />
    </div>
  );
};

export default TypingSection;
