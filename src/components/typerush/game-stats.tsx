"use client";

import { GameState, UserStats } from "@/lib/types";
import LiveStats from "./live-stats";
import ProgressDashboard from "./progress-dashboard";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

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
            <Card className="shadow-sm border-none bg-card text-left">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Your Typing Journey</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <ProgressDashboard stats={stats} />
                </CardContent>
            </Card>
        )}
    </div>
  );
};

export default GameStats;
