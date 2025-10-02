"use client";

import useEngine from "@/hooks/use-engine";
import Header from "./header";
import TypingSection from "./typing-section";
import StatsSection from "./stats-section";
import ResultsModal from "./results-modal";
import { Button } from "../ui/button";

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
    xpGained
  } = useEngine();

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto p-4 flex-1">
      <Header />
      <div className="flex flex-col lg:flex-row justify-center items-start gap-4 flex-1 w-full mt-4">
        <TypingSection
          words={words}
          typed={typed}
          totalTyped={totalTyped}
          lastPressedKey={lastPressedKey}
          stats={stats}
          onStart={startGame}
          state={state}
        />
        <div className="hidden lg:block w-px bg-border h-96 self-center"></div>
        <StatsSection
          state={state}
          wpm={wpm}
          accuracy={accuracy}
          timeLeft={timeLeft}
          stats={stats}
        />
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
