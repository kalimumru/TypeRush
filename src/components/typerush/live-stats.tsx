"use client";

import { Zap, Target } from 'lucide-react';
import { Card } from '../ui/card';

type LiveStatsProps = {
  wpm: number;
  accuracy: number;
  timeLeft: number;
};

const LiveStats = ({ wpm, accuracy, timeLeft }: LiveStatsProps) => {

  const StatCard = ({ value, label }: { value: string | number, label: string }) => (
    <Card className="flex flex-col items-center justify-center p-4 h-28 bg-card border-none shadow-md">
      <div className="text-4xl font-headline font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </Card>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
      <Card className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center p-4 h-32 bg-primary text-primary-foreground border-none shadow-md">
        <div className="text-sm uppercase">Time Left</div>
        <div className="text-6xl font-headline font-bold">{timeLeft}</div>
      </Card>
      <StatCard value={wpm} label="WPM" />
      <StatCard value={`${accuracy}%`} label="Accuracy" />
    </div>
  );
};

export default LiveStats;
