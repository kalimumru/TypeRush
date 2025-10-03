"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';

const useAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffers, setBuffers] = useState<Record<string, AudioBuffer>>({});
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const soundFiles = {
    correct: 'https://cdn.pixabay.com/audio/2022/03/15/audio_514652c71f.mp3',
    error: 'https://cdn.pixabay.com/audio/2021/08/04/audio_a42426c1a5.mp3',
    levelUp: 'https://cdn.pixabay.com/audio/2022/11/17/audio_88f1e56ed1.mp3',
  };

  useEffect(() => {
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
