"use client";

import useEngine from "@/hooks/use-engine";
import Header from "./header";
import TypingSection from "./typing-section";
import StatsSection from "./stats-section";
import ResultsModal from "./results-modal";
import { useEffect } from "react";
import { Trophy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ProgressDashboard from "./progress-dashboard";

const TyperushContainer = () => {
  const {
    state,
    words,
    typed,
    errors,
    wpm,
    accuracy,
    timeLeft,
    lastPressedKey,
    stats,
    totalTyped,
    restart,
    startGame,
    xpGained,
    levelUp,
  } = useEngine();
  
  const { toast } = useToast();

  useEffect(() => {
    if (levelUp) {
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached level ${stats.level}.`,
        action: <Trophy className="text-yellow-400" />,
      });
    }
  }, [levelUp, stats.level, toast]);


  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto p-4 flex-1">
      <div className="w-full flex justify-center items-center">
        <Header />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 justify-center items-start gap-4 flex-1 w-full mt-4">
        <div className="hidden lg:block lg:col-span-3">
           <ProgressDashboard stats={stats} />
        </div>
        <div className="lg:col-span-6">
            <TypingSection
              words={words}
              typed={typed}
              totalTyped={totalTyped}
              lastPressedKey={lastPressedKey}
              stats={stats}
              onStart={startGame}
              state={state}
            />
        </div>
        <div className="w-full lg:col-span-3">
            <StatsSection
              state={state}
              wpm={wpm}
              accuracy={accuracy}
              timeLeft={timeLeft}
              stats={stats}
            />
        </div>
      </div>
      {state === "finished" && (
        <ResultsModal
          isOpen={state === 'finished'}
          onRestart={restart}
          wpm={wpm}
          accuracy={accuracy}
          errors={errors.size}
          xpGained={xpGained}
        />
      )}
    </div>
  );
};

export default TyperushContainer;
