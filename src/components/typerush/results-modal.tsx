
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, Timer, Type } from "lucide-react";
import { Progress } from "../ui/progress";

type ResultsModalProps = {
  isOpen: boolean;
  onRestart: () => void;
  wpm: number;
  accuracy: number;
  errors: number;
  xpGained: number;
  timeTaken: number;
  totalTyped: number;
  isClosable: boolean;
};

const ResultsModal = ({
  isOpen,
  onRestart,
  wpm,
  accuracy,
  errors,
  xpGained,
  timeTaken,
  totalTyped,
  isClosable,
}: ResultsModalProps) => {

  const title = totalTyped > 0 ? "Good Job!" : "Your Results";
  const description = totalTyped > 0 
    ? "Here's your performance for this round."
    : "Start typing to see your stats.";


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && isClosable && onRestart()}>
      <DialogContent className="text-foreground shadow-lg border-none bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-muted-foreground text-sm">WPM</span>
            <span className="text-6xl font-bold font-headline text-foreground">
              {wpm}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
             <div className="w-full text-center">
                <p className="font-headline text-4xl font-bold">{accuracy}%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <Progress value={accuracy} className="h-2 mt-2" />
             </div>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-4 divide-x divide-border border-t border-border pt-6 mt-4">
              <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-xl flex items-center gap-1.5">
                    <Type className="w-4 h-4" />
                    {totalTyped}
                  </span>
                  <span className="text-xs text-muted-foreground">Characters</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-xl">{errors}</span>
                  <span className="text-xs text-muted-foreground">Errors</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-xl text-green-500">+{xpGained.toFixed(0)}</span>
                  <span className="text-xs text-muted-foreground">XP Gained</span>
              </div>
               <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-xl flex items-center gap-1.5">
                    <Timer className="w-4 h-4" />
                    {timeTaken.toFixed(1)}s
                  </span>
                  <span className="text-xs text-muted-foreground">Time Taken</span>
              </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button onClick={onRestart} variant="outline" className="w-full" disabled={!isClosable}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
