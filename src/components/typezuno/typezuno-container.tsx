
"use client";

import useEngine from "@/hooks/use-engine";
import Header from "./header";
import TypingSection from "./typing-section";
import ResultsModal from "./results-modal";
import { useEffect, useState } from "react";
import { Trophy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import GameStats from "./game-stats";
import StatsSection from "./stats-section";

const TypezunoContainer = () => {
  const [duration, setDuration] = useState(30);
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
    timeTaken,
    processInput,
  } = useEngine({ duration });
  
  const { toast } = useToast();
  const [isModalClosable, setIsModalClosable] = useState(false);

  useEffect(() => {
    if (state === 'finished') {
      setIsModalClosable(false);
      const timer = setTimeout(() => {
        setIsModalClosable(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

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
      <main className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full mt-4 flex-1">
        <div className="md:col-span-1 md:order-1 order-2">
           <GameStats state={state} stats={stats} wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />
        </div>
        <div className="md:col-span-2 md:order-2 order-1">
          <TypingSection
            words={words}
            typed={typed}
            totalTyped={totalTyped}
            lastPressedKey={lastPressedKey}
            stats={stats}
            onStart={startGame}
            state={state}
            duration={duration}
            onDurationChange={setDuration}
            processInput={processInput}
          />
        </div>
        <div className="md:col-span-1 md:order-3 order-3">
          <StatsSection />
        </div>
      </main>
      {state === "finished" && (
        <ResultsModal
          isOpen={state === 'finished'}
          onRestart={restart}
          wpm={wpm}
          accuracy={accuracy}
          errors={errors.size}
          xpGained={xpGained}
          timeTaken={timeTaken}
          totalTyped={totalTyped}
          isClosable={isModalClosable}
        />
      )}
    </div>
  );
};

export default TypezunoContainer;
