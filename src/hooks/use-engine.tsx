"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { generateWords } from '@/lib/word-generator';
import type { GameState, UserStats } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { loadUserData, saveUserData } from '@/lib/user-data';
import { Trophy } from 'lucide-react';
import React from 'react';

const GAME_TIME = 30; // 30 seconds for a quick game
const WORDS_COUNT = 50;

const useEngine = () => {
  const [state, setState] = useState<GameState>('waiting');
  const [words, setWords] = useState('');
  const [typed, setTyped] = useState('');
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats>(loadUserData());
  const [xpGained, setXpGained] = useState(0);

  const { toast } = useToast();

  const totalTyped = useMemo(() => typed.length, [typed]);
  const wpm = useMemo(() => {
    if (!startTime || totalTyped === 0) return 0;
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const grossWpm = (totalTyped / 5) / timeElapsed;
    return Math.round(Math.max(0, grossWpm));
  }, [totalTyped, startTime]);

  const accuracy = useMemo(() => {
    if (totalTyped === 0) return 100;
    const correctChars = totalTyped - errors.size;
    return Math.round((correctChars / totalTyped) * 100);
  }, [totalTyped, errors]);

  const prepareWords = useCallback(() => {
    const newWords = generateWords(WORDS_COUNT);
    setWords(newWords);
    setTyped('');
    setErrors(new Set());
    setLastPressedKey(null);
  }, []);

  const startGame = useCallback(() => {
    prepareWords();
    setState('running');
    setStartTime(Date.now());
    setTimeLeft(GAME_TIME);
  }, [prepareWords]);

  const restart = useCallback(() => {
    setState('waiting');
    setXpGained(0);
  }, []);

  const finishGame = useCallback(() => {
    setState('finished');
    const timeElapsed = (Date.now() - (startTime ?? Date.now())) / 1000;
    const finalWpm = Math.round(((totalTyped / 5) / timeElapsed) * 60);
    const finalAccuracy = accuracy;

    const newXp = (finalWpm * 0.5) + (finalAccuracy * 0.2);
    setXpGained(newXp);

    setStats(prevStats => {
      const xpForNextLevel = 100 * Math.pow(1.5, prevStats.level);
      let newLevel = prevStats.level;
      let currentXp = prevStats.xp + newXp;
      
      if (currentXp >= xpForNextLevel) {
        newLevel += 1;
        currentXp -= xpForNextLevel;
        toast({
          title: "Level Up!",
          description: `Congratulations! You've reached level ${newLevel}.`,
          action: <Trophy className="text-yellow-400" />,
        });
      }

      const updatedStats: UserStats = {
        ...prevStats,
        wpm: Math.max(prevStats.wpm, finalWpm),
        accuracy: Math.max(prevStats.accuracy, finalAccuracy),
        streaks: prevStats.streaks + 1, // Simplified
        level: newLevel,
        xp: currentXp,
      };

      // In a real app, keyStats would be updated here based on the session
      saveUserData(updatedStats);
      return updatedStats;
    });
  }, [startTime, totalTyped, accuracy, toast]);

  useEffect(() => {
    if (state === 'running') {
      const timer = setInterval(() => {
        const timeElapsed = (Date.now() - (startTime ?? Date.now())) / 1000;
        const newTimeLeft = Math.max(0, GAME_TIME - Math.floor(timeElapsed));
        setTimeLeft(newTimeLeft);

        if (newTimeLeft === 0) {
          clearInterval(timer);
          finishGame();
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state, startTime, finishGame]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (state !== 'running' || typed.length >= words.length) return;

    e.preventDefault();
    const { key } = e;
    setLastPressedKey(key);

    if (key === 'Backspace') {
      setTyped(prev => prev.slice(0, -1));
      setErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(typed.length - 1);
        return newErrors;
      });
      return;
    }

    if (key.length === 1) {
      if (words[totalTyped] !== key) {
        setErrors(prev => new Set(prev).add(totalTyped));
      }
      setTyped(prev => prev + key);
    }
  }, [state, typed, words, totalTyped]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { state, words, typed, errors, wpm, accuracy, timeLeft, lastPressedKey, stats, totalTyped, restart, startGame, xpGained };
};

export default useEngine;
