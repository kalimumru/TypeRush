
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BarChart, Calendar, Target, Zap, Rocket } from "lucide-react";
import { UserStats } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import { ProgressCircle } from "../ui/progress-circle";

const getJourneyTitle = (level: number) => {
    if (level >= 50) return "Touch-Typing God";
    if (level >= 20) return "Typing Sensei";
    if (level >= 10) return "Keyboard Ninja";
    if (level >= 5) return "Getting the Hang of It";
    if (level >= 3) return "Keyboard Padawan";
    return "The Beginning";
}

const ProgressDashboard = ({ stats }: { stats: UserStats }) => {
  const xpForNextLevel = 100 * Math.pow(1.5, stats.level);
  const xpProgress = (stats.xp / xpForNextLevel) * 100;
  const journeyTitle = getJourneyTitle(stats.level);

  const badges = [
    { icon: Zap, name: "Speed Demon", unlocked: stats.wpm > 80, description: "Reach over 80 WPM" },
    { icon: Target, name: "Accuracy Master", unlocked: stats.accuracy > 98, description: "Achieve 99% accuracy" },
    { icon: Calendar, name: "Consistent Coder", unlocked: stats.streaks > 7, description: "Complete a 7-day streak" },
    { icon: BarChart, name: "Level 10", unlocked: stats.level >= 10, description: "Reach level 10" },
    { icon: Award, name: "First Steps", unlocked: true, description: "Complete your first game" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in-50 duration-500">
      <Card className="shadow-none border-none bg-background p-4">
        <CardHeader className="p-0 pb-4 text-left">
          <CardTitle className="text-lg font-bold text-foreground">Level & XP</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-left flex items-center gap-4">
          <div className="relative">
            <ProgressCircle value={xpProgress} size={80} strokeWidth={8} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">LVL</span>
              <span className="text-2xl font-bold font-headline">{stats.level}</span>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">{stats.xp.toFixed(0)} / {xpForNextLevel.toFixed(0)} XP</p>
            <p className="text-sm text-muted-foreground">To next level</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-none border-none bg-background p-4">
        <CardHeader className="p-0 pb-4 text-left">
          <CardTitle className="text-sm font-semibold">Badges</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TooltipProvider>
            <div className="grid grid-cols-5 gap-3 text-center">
              {badges.map((badge) => (
                <Tooltip key={badge.name}>
                  <TooltipTrigger className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                      badge.unlocked 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-secondary text-muted-foreground/30'
                    )}>
                      <badge.icon className="w-6 h-6" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
      <Card className="shadow-none border-none bg-background p-4">
          <CardHeader className="p-0 pb-2 text-left">
              <CardTitle className="text-sm font-semibold">Typing Journey</CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-left flex items-center gap-3">
              <Rocket className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground font-medium">{journeyTitle}</p>
          </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDashboard;
