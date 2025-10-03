"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';

const useAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffers, setBuffers] = useState<Record<string, AudioBuffer>>({});
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Using more reliable URLs that are less likely to have CORS issues
  const soundFiles = {
    correct: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg',
    error: 'https://actions.google.com/sounds/v1/impacts/sharp_impact.ogg',
    levelUp: 'https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg',
  };

  useEffect(() => {
    // Ensure this runs only on the client
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);

    const loadSounds = async () => {
      const loadedBuffers: Record<string, AudioBuffer> = {};
      for (const key in soundFiles) {
        try {
          const response = await fetch(soundFiles[key as keyof typeof soundFiles]);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await context.decodeAudioData(arrayBuffer);
          loadedBuffers[key] = audioBuffer;
        } catch (error) {
          console.error(`Failed to load or decode sound: ${key}`, error);
        }
      }
      setBuffers(loadedBuffers);
    };

    loadSounds();

    // Cleanup audio context on component unmount
    return () => {
      context.close();
    };
  }, []);

  const playSound = useCallback(
    (key: string) => {
      if (!audioContext || !buffers[key] || isMuted) return;

      // Re-initialize audio context if it's suspended (e.g., due to user inactivity)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffers[key];

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.start(0);
    },
    [audioContext, buffers, isMuted, volume]
  );

  const playCorrect = useCallback(() => playSound('correct'), [playSound]);
  const playError = useCallback(() => playSound('error'), [playSound]);
  const playLevelUp = useCallback(() => playSound('levelUp'), [playSound]);

  const toggleSound = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handleSetVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  }, [isMuted]);

  return {
    playCorrect,
    playError,
    playLevelUp,
    setVolume: handleSetVolume,
    volume,
    toggleMute: toggleSound,
    isMuted,
  };
};

export default useAudio;
