"use client";

import { Zap, Target } from 'lucide-react';

type LiveStatsProps = {
  wpm: number;
  accuracy: number;
  timeLeft: number;
};

const LiveStats = ({ wpm, accuracy, timeLeft }: LiveStatsProps) => {

  const StatCard = ({ icon: Icon, value, label, unit }: { icon: React.ElementType, value: string | number, label: string, unit?: string }) => (
    <div className="relative flex flex-col items-center justify-center bg-black/20 rounded-lg p-4 h-28 md:h-32 backdrop-blur-sm border border-white/10 transform transition-transform hover:scale-105 hover:bg-black/30">
      <div className="absolute top-2 right-2 text-primary/50">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-3xl md:text-4xl font-headline font-bold text-glow-accent">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
      <div className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center bg-black/20 rounded-lg p-4 h-28 md:h-32 backdrop-blur-sm border border-white/10">
        <div className="text-sm text-muted-foreground">Time Left</div>
        <div className="text-5xl md:text-6xl font-headline font-bold text-glow-primary">{timeLeft}</div>
      </div>
      <StatCard icon={Zap} value={wpm} label="WPM" />
      <StatCard icon={Target} value={`${accuracy}%`} label="Accuracy" />
    </div>
  );
};

export default LiveStats;
