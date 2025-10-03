"use client";

import { GameState, UserStats } from "@/lib/types";
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
    <div className="w-full flex flex-col gap-4">
      <div className="flex-grow">
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default StatsSection;
