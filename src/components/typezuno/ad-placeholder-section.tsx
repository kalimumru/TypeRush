
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";

const AdPlaceholder = () => (
    <Card className="bg-card text-left shadow-md border-none">
        <CardContent className="p-4">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Ad Placeholder</p>
            </AspectRatio>
        </CardContent>
    </Card>
)

const AdPlaceholderSection = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <AdPlaceholder />
      <AdPlaceholder />
    </div>
  );
};

export default AdPlaceholderSection;
