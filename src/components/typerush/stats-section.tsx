"use client";

import { Card } from "../ui/card";

const AdPlaceholder = () => (
    <Card className="flex items-center justify-center h-48 lg:h-full bg-secondary text-muted-foreground border-none shadow-md">
        <span>Ad Placeholder</span>
    </Card>
);


const StatsSection = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex-grow">
        <AdPlaceholder />
      </div>
       <div className="flex-grow">
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default StatsSection;
