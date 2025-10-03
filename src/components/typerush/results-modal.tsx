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
import { ProgressCircle } from "@/components/ui/progress-circle";
import { RefreshCw } from "lucide-react";

type ResultsModalProps = {
  isOpen: boolean;
  onRestart: () => void;
  wpm: number;
  accuracy: number;
  errors: number;
  xpGained: number;
};

const ResultsModal = ({
  isOpen,
  onRestart,
  wpm,
  accuracy,
  errors,
  xpGained
}: ResultsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onRestart()}>
      <DialogContent className="text-foreground shadow-xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-center text-primary">
            Results
          </DialogTitle>
          <DialogDescription className="text-center">
            Here is your performance for this round.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-muted-foreground">WPM</span>
            <span className="text-6xl font-bold font-headline text-foreground">
              {wpm}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
             <div className="relative">
              <ProgressCircle value={accuracy} size={100} strokeWidth={8} />
              <div className="absolute inset-0 flex items-center justify-center font-headline text-2xl font-bold text-foreground">
                {accuracy}%
              </div>
            </div>
            <span className="text-muted-foreground">Accuracy</span>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-3 divide-x divide-border pt-4">
              <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-xl">{wpm * 5}</span>
                  <span className="text-xs text-muted-foreground">Characters</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-xl text-red-500">{errors}</span>
                  <span className="text-xs text-muted-foreground">Errors</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-xl text-green-500">+{xpGained.toFixed(0)}</span>
                  <span className="text-xs text-muted-foreground">XP Gained</span>
              </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onRestart} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
