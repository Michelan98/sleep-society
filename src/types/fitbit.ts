
export interface FitbitCredentials {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
}

export interface FitbitSleepData {
  id: string;
  logId: string;
  startTime: string;
  endTime: string;
  duration: number; // in milliseconds
  efficiency: number; // 0-100
  minutesAsleep: number;
  minutesAwake: number;
  minutesAfterWakeup: number;
  minutesToFallAsleep: number;
  timeInBed: number;
  levels: {
    summary: {
      deep: { minutes: number; count: number };
      light: { minutes: number; count: number };
      rem: { minutes: number; count: number };
      wake: { minutes: number; count: number };
    };
    data: Array<{
      level: 'deep' | 'light' | 'rem' | 'wake';
      startTime?: string;
      endTime?: string;
      seconds?: number;
    }>;
  };
}

export interface FitbitSleepResponse {
  sleep: FitbitSleepData[];
  summary: {
    totalMinutesAsleep: number;
    totalTimeInBed: number;
    totalSleepRecords: number;
  };
}

// Scopes available for Fitbit API
export type FitbitScope = 
  | "activity" 
  | "cardio_fitness"
  | "electrocardiogram"
  | "heartrate"
  | "location"
  | "nutrition"
  | "oxygen_saturation"
  | "profile"
  | "respiratory_rate"
  | "settings"
  | "sleep"
  | "social"
  | "temperature"
  | "weight";
