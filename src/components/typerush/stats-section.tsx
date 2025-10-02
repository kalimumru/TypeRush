"use client";

import { GameState, UserStats } from "@/lib/types";
import LiveStats from "./live-stats";
import ProgressDashboard from "./progress-dashboard";

type StatsSectionProps = {
  state: GameState;
  wpm: number;
  accuracy: number;
  timeLeft: number;
  stats: UserStats;
};

const StatsSection = ({ state, wpm, accuracy, timeLeft, stats }: StatsSectionProps) => {
  return (
    <div className="w-full lg:w-96 p-4">
      {state === 'running' ? (
        <LiveStats wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />
      ) : (
        <ProgressDashboard stats={stats} />
      )}
    </div>
  );
};

export default StatsSection;
