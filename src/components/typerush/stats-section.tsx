"use client";

import { GameState, UserStats } from "@/lib/types";
import LiveStats from "./live-stats";
import ProgressDashboard from "./progress-dashboard";
import { Card } from "../ui/card";

type StatsSectionProps = {
  state: GameState;
  wpm: number;
  accuracy: number;
  timeLeft: number;
  stats: UserStats;
};

const AdPlaceholder = () => (
    <Card className="flex items-center justify-center h-48 lg:h-full bg-white/30 border-dashed border-2 text-muted-foreground">
        <span>Ad Placeholder</span>
    </Card>
);


const StatsSection = ({ state, wpm, accuracy, timeLeft, stats }: StatsSectionProps) => {
  return (
    <div className="w-full lg:w-96 p-4 flex flex-col gap-4">
      {state === 'running' ? (
        <LiveStats wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />
      ) : (
        <ProgressDashboard stats={stats} />
      )}
      <div className="hidden lg:block flex-grow mt-4">
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default StatsSection;
