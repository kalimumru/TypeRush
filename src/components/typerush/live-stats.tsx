"use client";

import { Zap, Target } from 'lucide-react';
import { Card } from '../ui/card';

type LiveStatsProps = {
  wpm: number;
  accuracy: number;
  timeLeft: number;
};

const LiveStats = ({ wpm, accuracy, timeLeft }: LiveStatsProps) => {

  const StatCard = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string | number, label: string }) => (
    <Card className="relative flex flex-col items-center justify-center p-4 h-28 md:h-32 shadow-md">
      <div className="absolute top-3 right-3 text-primary/70">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-3xl md:text-4xl font-headline font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </Card>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
      <Card className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center p-4 h-28 md:h-32 shadow-md">
        <div className="text-sm text-muted-foreground">Time Left</div>
        <div className="text-5xl md:text-6xl font-headline font-bold text-foreground">{timeLeft}</div>
      </Card>
      <StatCard icon={Zap} value={wpm} label="WPM" />
      <StatCard icon={Target} value={`${accuracy}%`} label="Accuracy" />
    </div>
  );
};

export default LiveStats;
