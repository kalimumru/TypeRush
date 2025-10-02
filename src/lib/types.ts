import { z } from 'zod';

export type GameState = 'waiting' | 'running' | 'finished';

export const keyStatSchema = z.object({
  char: z.string(),
  count: z.number(),
  errors: z.number(),
  times: z.array(z.number()),
});

export const userStatsSchema = z.object({
  level: z.number().default(1),
  xp: z.number().default(0),
  wpm: z.number().default(0),
  accuracy: z.number().default(0),
  streaks: z.number().default(0),
  badges: z.array(z.string()).default([]),
  unlockedLetters: z.array(z.string()).default(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']),
  keyStats: z.record(keyStatSchema).default({}),
});

export type KeyStat = z.infer<typeof keyStatSchema>;
export type UserStats = z.infer<typeof userStatsSchema>;
