
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { generateWords } from '@/lib/word-generator';
import type { GameState, UserStats } from '@/lib/types';
import { loadUserData, saveUserData } from '@/lib/user-data';

const getWordsCount = (duration: number): number => {
  if (duration <= 15) return 15;
  if (duration <= 30) return 30;
  if (duration <= 60) return 50;
  return 80;
};

const defaultStats: UserStats = {
  level: 1,
  xp: 0,
  wpm: 0,
  accuracy: 0,
  streaks: 0,
  badges: [],
  unlockedLetters: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
  keyStats: {},
};

type EngineOptions = {
  duration?: number;
};

const useEngine = (options?: EngineOptions) => {
  const gameTime = options?.duration || 30;

  const [state, setState] = useState<GameState>('waiting');
  const [words, setWords] = useState('');
  const [typed, setTyped] = useState('');
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(gameTime);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [isMounted, setIsMounted] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [isNewKeyCorrect, setIsNewKeyCorrect] = useState<boolean | null>(null);
  const [levelUp, setLevelUp] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setStats(loadUserData());
    setTimeLeft(gameTime);
  }, [gameTime]);
  
  useEffect(() => {
    if(isMounted) {
      saveUserData(stats);
    }
  }, [stats, isMounted]);

  const totalTyped = useMemo(() => typed.length, [typed]);
  
  const wpm = useMemo(() => {
    if (!startTime || totalTyped === 0) return 0;
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    if (timeElapsed === 0) return 0;
    const grossWpm = (totalTyped / 5) / timeElapsed;
    return Math.round(Math.max(0, grossWpm));
  }, [totalTyped, startTime]);

  const accuracy = useMemo(() => {
    if (totalTyped === 0) return 0;
    const correctChars = totalTyped - errors.size;
    return Math.round((correctChars / totalTyped) * 100);
  }, [totalTyped, errors]);

  const prepareWords = useCallback(() => {
    const wordsCount = getWordsCount(gameTime);
    const newWords = generateWords(wordsCount);
    setWords(newWords);
    setTyped('');
    setErrors(new Set());
    setLastPressedKey(null);
  }, [gameTime]);

  const startGame = useCallback(() => {
    prepareWords();
    setState('running');
    setStartTime(Date.now());
    setTimeLeft(gameTime);
    setLevelUp(false);
  }, [prepareWords, gameTime]);

  const restart = useCallback(() => {
    setState('waiting');
    setXpGained(0);
    setLevelUp(false);
    setTimeTaken(0);
  }, []);

  const finishGame = useCallback(() => {
    setState(currentState => {
      if (currentState !== 'running' || !startTime) return currentState;

      const timeElapsedInSeconds = (Date.now() - startTime) / 1000;
      setTimeTaken(timeElapsedInSeconds);

      setTyped(currentTyped => {
        setErrors(currentErrors => {
          const finalTotalTyped = currentTyped.length;
          if (finalTotalTyped === 0) {
            setState('finished');
            return currentErrors;
          }
          const finalCorrectChars = finalTotalTyped - currentErrors.size;
          const finalAccuracy = Math.round((finalCorrectChars / finalTotalTyped) * 100);
          const finalWpm = Math.round(((finalTotalTyped / 5) / timeElapsedInSeconds) * 60);
          
          const newXp = (finalWpm * 0.5) + (finalAccuracy * 0.2);
          setXpGained(newXp);
      
          setStats(prevStats => {
            const xpForNextLevel = 100 * Math.pow(1.5, prevStats.level);
            let newLevel = prevStats.level;
            let currentXp = prevStats.xp + newXp;
            
            if (currentXp >= xpForNextLevel) {
              newLevel += 1;
              currentXp -= xpForNextLevel;
              setLevelUp(true);
            }
      
            const updatedStats: UserStats = {
              ...prevStats,
              wpm: Math.max(prevStats.wpm, finalWpm),
              accuracy: Math.max(prevStats.accuracy, finalAccuracy),
              streaks: prevStats.streaks + 1, // Simplified
              level: newLevel,
              xp: currentXp,
            };
      
            return updatedStats;
          });

          return currentErrors;
        });
        return currentTyped;
      });

      return 'finished';
    });
  }, [startTime]);


  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (state === 'running') {
      timer = setInterval(() => {
        const timeElapsed = (Date.now() - startTime!) / 1000;
        const newTimeLeft = Math.max(0, gameTime - Math.floor(timeElapsed));
        setTimeLeft(newTimeLeft);

        if (newTimeLeft <= 0) {
            finishGame();
        }
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state, startTime, gameTime, finishGame]);
  
  const processInput = useCallback((newTyped: string) => {
    if (state !== 'running' || newTyped.length > words.length) return;
    
    setTyped(newTyped);

    const newErrors = new Set<number>();
    for (let i = 0; i < newTyped.length; i++) {
        if (newTyped[i] !== words[i]) {
            newErrors.add(i);
        }
    }
    setErrors(newErrors);

    if (newTyped.length === words.length) {
      finishGame();
    }
  }, [state, words, finishGame]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (state !== 'running' || typed.length >= words.length) return;

    // This logic is primarily for physical keyboards
    if (e.isComposing || e.keyCode === 229) return;


    e.preventDefault();
    const { key } = e;
    setLastPressedKey(key);

    let newTyped = typed;
    if (key === 'Backspace') {
      newTyped = typed.slice(0, -1)
    } else if (key.length === 1) {
      newTyped = typed + key;
    }
    
    processInput(newTyped);

  }, [state, typed, words, processInput]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  if (!isMounted) {
    return { 
      state: 'waiting', 
      words: '', 
      typed: '', 
      errors: new Set(), 
      wpm: 0, 
      accuracy: 0, 
      timeLeft: gameTime, 
      lastPressedKey: null, 
      stats: defaultStats, 
      totalTyped: 0, 
      restart: () => {}, 
      startGame: () => {}, 
      xpGained: 0,
      levelUp: false,
      timeTaken: 0,
      processInput: () => {},
    };
  }

  return { state, words, typed, errors, wpm, accuracy, timeLeft, lastPressedKey, stats, totalTyped, restart, startGame, xpGained, levelUp, timeTaken, processInput };
};

export default useEngine;
