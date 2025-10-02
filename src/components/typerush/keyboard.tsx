"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import type { KeyStat } from "@/lib/types";

const keyLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ShiftRight'],
  [' ', ' '],
];

const keyIdMap: { [key: string]: string } = {
  '`': 'Backquote', '1': 'Digit1', '2': 'Digit2', '3': 'Digit3', '4': 'Digit4',
  '5': 'Digit5', '6': 'Digit6', '7': 'Digit7', '8': 'Digit8', '9': 'Digit9',
  '0': 'Digit0', '-': 'Minus', '=': 'Equal',
  'q': 'KeyQ', 'w': 'KeyW', 'e': 'KeyE', 'r': 'KeyR', 't': 'KeyT', 'y': 'KeyY',
  'u': 'KeyU', 'i': 'KeyI', 'o': 'KeyO', 'p': 'KeyP', '[': 'BracketLeft',
  ']': 'BracketRight', '\\': 'Backslash',
  'a': 'KeyA', 's': 'KeyS', 'd': 'KeyD', 'f': 'KeyF', 'g': 'KeyG', 'h': 'KeyH',
  'j': 'KeyJ', 'k': 'KeyK', 'l': 'KeyL', ';': 'Semicolon', "'": 'Quote',
  'z': 'KeyZ', 'x': 'KeyX', 'c': 'KeyC', 'v': 'KeyV', 'b': 'KeyB', 'n': 'KeyN',
  'm': 'KeyM', ',': 'Comma', '.': 'Period', '/': 'Slash',
  ' ': 'Space',
  'shiftleft': 'ShiftLeft',
  'shiftright': 'ShiftRight',
};

const getKeyId = (key: string) => {
  if (key.length === 1) return keyIdMap[key.toLowerCase()];
  return keyIdMap[key.toLowerCase()] || key;
};

type KeyboardProps = {
  lastPressedKey: string | null;
  keyStats: Record<string, KeyStat>;
};

const Keyboard = ({ lastPressedKey, keyStats }: KeyboardProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (lastPressedKey) {
      const keyId = getKeyId(lastPressedKey);
      setActiveKey(keyId);
      const timer = setTimeout(() => setActiveKey(null), 150);
      return () => clearTimeout(timer);
    }
  }, [lastPressedKey]);

  const getPerfColor = (char: string) => {
    const stat = keyStats[char.toLowerCase()];
    if (!stat || stat.count < 5) return 'bg-secondary/20'; // Neutral for not enough data
    const accuracy = (stat.count - stat.errors) / stat.count;
    if (accuracy > 0.95) return 'bg-green-500/30';
    if (accuracy > 0.85) return 'bg-yellow-500/30';
    return 'bg-red-500/30';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4 rounded-lg bg-black/20" style={{ perspective: '1000px' }}>
      <div className="space-y-1 md:space-y-2" style={{ transform: 'rotateX(10deg)' }}>
        {keyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 md:gap-2">
            {row.map((key, keyIndex) => {
              const keyId = getKeyId(key);
              const isActive = activeKey === keyId;
              const displayKey = key.startsWith('Shift') ? 'Shift' : key;
              
              const keyClass = cn(
                "flex items-center justify-center rounded-md md:rounded-lg text-xs md:text-sm font-sans uppercase transition-all duration-150 ease-out border-b-2 md:border-b-4",
                "border-white/10 text-neutral-300",
                {
                  'w-12 h-10 md:w-24 md:h-12': key === 'Backspace',
                  'w-16 h-10 md:w-32 md:h-12': key === 'Tab' || key === 'Enter',
                  'w-20 h-10 md:w-40 md:h-12': key === 'CapsLock' || key.startsWith('Shift'),
                  'flex-1 h-10 md:h-12': key === ' ',
                  'w-8 h-10 md:w-12 md:h-12': key.length === 1,
                  'transform -translate-y-px': !isActive,
                  'transform translate-y-0.5 border-b-2': isActive,
                },
                key.length === 1 ? getPerfColor(key) : 'bg-secondary/20',
                isActive && "box-glow-accent !border-accent !text-accent scale-105",
                key === " " ? "bg-secondary/10" : ""
              );
              
              return (
                <div key={`${keyId}-${keyIndex}`} id={keyId} className={keyClass}>
                  {displayKey !== ' ' ? displayKey : 'Space'}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
