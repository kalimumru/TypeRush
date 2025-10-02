"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BarChart, Calendar, Target, Zap } from "lucide-react";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { UserStats } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ProgressDashboard = ({ stats }: { stats: UserStats }) => {
  const xpForNextLevel = 100 * Math.pow(1.5, stats.level);
  const xpProgress = (stats.xp / xpForNextLevel) * 100;

  const badges = [
    { icon: Zap, name: "Speed Demon", unlocked: stats.wpm > 80 },
    { icon: Target, name: "Accuracy Master", unlocked: stats.accuracy > 98 },
    { icon: Calendar, name: "Consistent Coder", unlocked: stats.streaks > 7 },
    { icon: BarChart, name: "Level 10", unlocked: stats.level >= 10 },
    { icon: Award, name: "First Steps", unlocked: true },
  ];

  const journey = [
    { level: 1, name: "The Beginning" },
    { level: 5, name: "Getting the Hang of It" },
    { level: 10, name: "Keyboard Ninja" },
    { level: 20, name: "Typing Sensei" },
    { level: 50, name: "Touch-Typing God" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in-50 duration-500">
      <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-headline text-accent">Level & XP</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="relative">
            <ProgressCircle value={xpProgress} size={80} strokeWidth={8} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">LVL</span>
              <span className="font-headline text-xl font-bold text-glow-primary">{stats.level}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{stats.xp.toFixed(0)} / {xpForNextLevel.toFixed(0)} XP</p>
            <p className="text-xs text-muted-foreground">To next level</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-headline text-accent">Typing Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {journey.map((step) => (
              <li key={step.level} className={`flex items-center gap-3 text-sm ${stats.level >= step.level ? 'text-foreground' : 'text-muted-foreground'}`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.level >= step.level ? 'bg-primary' : 'bg-secondary'}`}>
                  {stats.level >= step.level && <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>}
                </div>
                Level {step.level}: {step.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-headline text-accent">Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="grid grid-cols-4 gap-4">
              {badges.map((badge) => (
                <Tooltip key={badge.name}>
                  <TooltipTrigger>
                    <div className={`aspect-square rounded-md flex items-center justify-center transition-all ${badge.unlocked ? 'bg-primary/20 text-accent box-glow-accent' : 'bg-secondary/20 text-muted-foreground'}`}>
                      <badge.icon className="w-6 h-6" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDashboard;
