
export interface SleepData {
  id: string;
  userId: string;
  date: string;
  duration: string;
  quality: string;
  energyScore: string;
  deepSleepPercentage: number;
  remSleepPercentage: number;
  lightSleepPercentage: number;
  awakeTime: number;
  heartRateAvg: number;
  note?: string;
}

export interface SleepFeedItem {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  duration: string;
  qualityScore: string;
  date: string;
  timeAgo: string;
  likes: number;
  note?: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  sleepDuration: string;
  sleepQuality: string;
  rank: number;
}
