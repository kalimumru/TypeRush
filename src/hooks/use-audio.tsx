"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';

const useAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffers, setBuffers] = useState<Record<string, AudioBuffer>>({});
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const soundFiles = {
    correct: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg',
    error: 'https://actions.google.com/sounds/v1/impacts/sharp_impact.ogg',
    levelUp: 'https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg',
  };

  useEffect(() => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);

    const loadSounds = async () => {
      const loadedBuffers: Record<string, AudioBuffer> = {};
      for (const key in soundFiles) {
        try {
          const response = await fetch(soundFiles[key as keyof typeof soundFiles], { mode: 'cors' });
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await context.decodeAudioData(arrayBuffer);
          loadedBuffers[key] = audioBuffer;
        } catch (error) {
          console.error(`Failed to load sound: ${key}`, error);
        }
      }
      setBuffers(loadedBuffers);
    };

    loadSounds();

    return () => {
      context.close();
    };
  }, []);

  const playSound = useCallback(
    (key: string) => {
      if (!audioContext || !buffers[key] || isMuted) return;

      const source = audioContext.createBufferSource();
      source.buffer = buffers[key];

      const gainNode = audioContext.createGain();
      gainNode.gain.value = volume;
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

  return {
    playCorrect,
    playError,
    playLevelUp,
    setVolume,
    volume,
    toggleSound,
    isMuted,
  };
};

export default useAudio;
