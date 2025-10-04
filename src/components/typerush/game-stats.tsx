"use client";

import { GameState, UserStats } from "@/lib/types";
import LiveStats from "./live-stats";
import ProgressDashboard from "./progress-dashboard";

type GameStatsProps = {
  state: GameState;
  wpm: number;
  accuracy: number;
  timeLeft: number;
  stats: UserStats;
};

const GameStats = ({ state, wpm, accuracy, timeLeft, stats }: GameStatsProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {state === 'running' ? (
        <LiveStats wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />
      ) : (
        <ProgressDashboard stats={stats} />
      )}
    </div>
  );
};

export default GameStats;
