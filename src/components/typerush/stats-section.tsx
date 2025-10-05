
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { HelpCircle, TrendingUp } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="w-full flex flex-col gap-4 animate-in fade-in-50 duration-500">
      <Card className="bg-card text-left shadow-md border-none">
        <CardHeader className="p-4 pb-2">
            <CardTitle className="font-headline text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                How to Play
            </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 text-sm text-muted-foreground space-y-2">
            <p>1. Select your desired test duration from the dropdown.</p>
            <p>2. Click the <strong>Start</strong> button to begin the test.</p>
            <p>3. Type the words you see on the screen as quickly and accurately as you can.</p>
            <p>4. Your results will be shown automatically when the time is up.</p>
        </CardContent>
      </Card>
      <Card className="bg-card text-left shadow-md border-none">
        <CardHeader className="p-4 pb-2">
            <CardTitle className="font-headline text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Tips for Improving
            </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 text-sm text-muted-foreground space-y-2">
           <ul className="list-disc pl-5 space-y-1">
                <li>Focus on accuracy first, then speed.</li>
                <li>Try to maintain a steady rhythm while typing.</li>
                <li>Use all your fingers, not just your index fingers.</li>
                <li>Practice regularly to build muscle memory.</li>
           </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSection;
