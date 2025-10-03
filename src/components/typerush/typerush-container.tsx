"use client";

import useEngine from "@/hooks/use-engine";
import useAudio from "@/hooks/use-audio";
import Header from "./header";
import TypingSection from "./typing-section";
import StatsSection from "./stats-section";
import ResultsModal from "./results-modal";
import AudioSettings from "./audio-settings";
import { useEffect } from "react";
import { Trophy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const TyperushContainer = () => {
  const {
    playCorrect,
    playError,
    playLevelUp,
    setVolume,
    toggleMute,
    isMuted,
    volume,
  } = useAudio();

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
    isNewKeyCorrect,
    levelUp,
  } = useEngine();
  
  const { toast } = useToast();

  useEffect(() => {
    if (state === "running") {
      if (isNewKeyCorrect === true) {
        playCorrect();
      } else if (isNewKeyCorrect === false) {
        playError();
      }
    }
  }, [typed, state, playCorrect, playError, isNewKeyCorrect]);

  useEffect(() => {
    if (levelUp) {
      playLevelUp();
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached level ${stats.level}.`,
        action: <Trophy className="text-yellow-400" />,
      });
    }
  }, [levelUp, playLevelUp, stats.level, toast]);


  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto p-4 flex-1">
      <div className="w-full flex justify-between items-center">
        <Header />
        <AudioSettings 
          volume={volume}
          setVolume={setVolume}
          isMuted={isMuted}
          toggleMute={toggleMute}
        />
      </div>
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
