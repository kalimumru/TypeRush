"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Settings } from "lucide-react";

type AudioSettingsProps = {
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
};

const AudioSettings = ({ volume, setVolume, isMuted, toggleMute }: AudioSettingsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-6 h-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Audio Settings</h4>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={1}
              step={0.05}
              disabled={isMuted}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AudioSettings;
