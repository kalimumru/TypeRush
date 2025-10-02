
import { userStatsSchema, type UserStats } from './types';

const USER_DATA_KEY = 'typerush_user_data';

export const defaultUserData: UserStats = userStatsSchema.parse({});

export const loadUserData = (): UserStats => {
  if (typeof window === 'undefined') {
    return defaultUserData;
  }

  try {
    const data = localStorage.getItem(USER_DATA_KEY);
    if (!data) return defaultUserData;
    
    const parsed = userStatsSchema.safeParse(JSON.parse(data));
    if (parsed.success) {
      return parsed.data;
    }
    
    // Don't log in production
    // console.warn("Invalid user data in localStorage, resetting to default.", parsed.error);
    return defaultUserData;
  } catch (error) {
    // console.error("Failed to load user data from localStorage:", error);
    return defaultUserData;
  }
};

export const saveUserData = (stats: UserStats) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(stats));
  } catch (error) {
    // console.error("Failed to save user data to localStorage:", error);
  }
};
