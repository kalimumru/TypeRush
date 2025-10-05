"use client";

import { GameState, UserStats } from "@/lib/types";
import LiveStats from "./live-stats";
import ProgressDashboard from "./progress-dashboard";
import { Card, CardContent } from "../ui/card";
import StatsSection from "./stats-section";

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
        ) : state === 'finished' ? (
            <Card className="shadow-md border-none bg-card text-left p-4">
                <CardContent className="p-0">
                    <ProgressDashboard stats={stats} />
                </CardContent>
            </Card>
        ) : (
            <StatsSection />
        )}
    </div>
  );
};

export default GameStats;
