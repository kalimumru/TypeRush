"use client";

import { useState, useCallback, useEffect } from 'react';

const useAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffers, setBuffers] = useState<Record<string, AudioBuffer>>({});

  const soundFiles = {
    correct: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg',
    error: 'https://actions.google.com/sounds/v1/impacts/sharp_impact.ogg',
    levelUp: 'https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg',
  };

  useEffect(() => {
    // AudioContext can only be created on the client
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

    return () => {
      context.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSound = useCallback(
    (key: string) => {
      if (!audioContext || !buffers[key]) return;

      // Resume context if it's suspended (e.g., due to browser autoplay policies)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffers[key];
      
      source.connect(audioContext.destination);

      source.start(0);
    },
    [audioContext, buffers]
  );

  const playCorrect = useCallback(() => playSound('correct'), [playSound]);
  const playError = useCallback(() => playSound('error'), [playSound]);
  const playLevelUp = useCallback(() => playSound('levelUp'), [playSound]);

  return {
    playCorrect,
    playError,
    playLevelUp,
  };
};

export default useAudio;
