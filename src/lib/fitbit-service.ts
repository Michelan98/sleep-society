
import { FitbitCredentials, FitbitSleepResponse } from "@/types/fitbit";
import { SleepData } from "@/types/sleep";
import { toast } from "@/hooks/use-toast";

// Fitbit API configuration
const FITBIT_CLIENT_ID = "23Q4N8"; // From the image shared
const FITBIT_AUTH_URL = "https://www.fitbit.com/oauth2/authorize";
const FITBIT_TOKEN_URL = "https://api.fitbit.com/oauth2/token";
const REDIRECT_URI = "https://sleep-society.lovable.app/fitbit-callback"; // From the image shared

// Store the last sync time
let lastSyncTime: Date | null = null;

// Convert Fitbit sleep data to our app's format
const convertFitbitSleepToAppFormat = (fitbitData: FitbitSleepResponse): SleepData | null => {
  if (!fitbitData.sleep || fitbitData.sleep.length === 0) {
    return null;
  }

  const sleepEntry = fitbitData.sleep[0]; // Use the most recent sleep entry
  const summary = sleepEntry.levels.summary;

  // Calculate sleep percentages
  const totalMinutes = (summary.deep.minutes || 0) + 
                      (summary.light.minutes || 0) + 
                      (summary.rem.minutes || 0) + 
                      (summary.wake.minutes || 0);
  
  const deepPercentage = totalMinutes > 0 ? Math.round((summary.deep.minutes / totalMinutes) * 100) : 0;
  const remPercentage = totalMinutes > 0 ? Math.round((summary.rem.minutes / totalMinutes) * 100) : 0;
  const lightPercentage = totalMinutes > 0 ? Math.round((summary.light.minutes / totalMinutes) * 100) : 0;
  
  // Calculate duration in hours and minutes
  const durationInMinutes = sleepEntry.duration / 60000; // Convert ms to minutes
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = Math.round(durationInMinutes % 60);
  
  // Calculate sleep quality (simplified algorithm)
  // Higher percentages of deep and REM sleep are associated with better sleep quality
  const qualityScore = Math.min(100, Math.round(
    (deepPercentage * 1.5) + (remPercentage * 1.2) + (lightPercentage * 0.5)
  ));
  
  // Calculate energy score based on sleep quality and duration
  // This is a simplified scoring model
  const idealSleepHours = 8;
  const durationFactor = Math.min(1, durationInMinutes / (idealSleepHours * 60));
  const energyScore = Math.round(qualityScore * durationFactor);

  return {
    id: sleepEntry.logId,
    userId: "fitbit-user", // Placeholder, would be associated with the app user
    date: sleepEntry.startTime,
    duration: `${hours}h ${minutes}m`,
    quality: `${qualityScore}%`,
    energyScore: energyScore.toString(),
    deepSleepPercentage: deepPercentage,
    remSleepPercentage: remPercentage,
    lightSleepPercentage: lightPercentage,
    awakeTime: summary.wake.minutes || 0,
    heartRateAvg: 0, // Fitbit sleep data doesn't include heart rate directly
    note: "Imported from Fitbit",
  };
};

// In a real app, these would point to actual backend endpoints
class FitbitService {
  // Auth utilities
  getAuthUrl(): string {
    const scopes = "sleep";
    const state = this.generateRandomState();
    localStorage.setItem("fitbit_auth_state", state);
    
    const params = new URLSearchParams({
      client_id: FITBIT_CLIENT_ID,
      response_type: "code",
      scope: scopes,
      redirect_uri: REDIRECT_URI,
      state: state
    });
    
    return `${FITBIT_AUTH_URL}?${params.toString()}`;
  }
  
  // Generate a random state parameter for CSRF protection
  private generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15);
  }
  
  // Validate state parameter to prevent CSRF attacks
  validateState(returnedState: string): boolean {
    const originalState = localStorage.getItem("fitbit_auth_state");
    // Clear state from storage after validation
    localStorage.removeItem("fitbit_auth_state");
    return originalState === returnedState;
  }

  async exchangeCodeForToken(code: string): Promise<FitbitCredentials | null> {
    try {
      // In a production app, this exchange should happen on your backend
      // For demo purposes, we'll simulate successful token exchange
      console.log("Simulating token exchange with code:", code);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, return mock credentials
      // In production, this would make a real API call to Fitbit
      const mockCredentials: FitbitCredentials = {
        accessToken: "mock_access_token_" + Date.now(),
        refreshToken: "mock_refresh_token_" + Date.now(),
        expiresAt: Date.now() + 28800000, // 8 hours from now
        userId: "mock_user_id",
      };
      
      // Store credentials in localStorage for demo
      // In production, these should be securely stored on your backend
      localStorage.setItem("fitbit_credentials", JSON.stringify(mockCredentials));
      
      return mockCredentials;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      toast({
        title: "Authentication Error",
        description: "Failed to connect to Fitbit. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  }

  // Data fetching
  async getSleepData(date: string = 'today'): Promise<SleepData | null> {
    try {
      // In a production app, this would make a real API call to Fitbit
      console.log(`Fetching sleep data for ${date}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create mock Fitbit sleep response in the format that the real API would return
      const mockFitbitResponse: FitbitSleepResponse = {
        sleep: [
          {
            id: "mock_sleep_id_" + Date.now(),
            logId: "mock_log_id_" + Date.now(),
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 28800000).toISOString(), // 8 hours later
            duration: 28800000, // 8 hours in milliseconds
            efficiency: 90,
            minutesAsleep: 460,
            minutesAwake: 20,
            minutesAfterWakeup: 5,
            minutesToFallAsleep: 15,
            timeInBed: 500,
            levels: {
              summary: {
                deep: { minutes: 100, count: 4 },
                light: { minutes: 250, count: 20 },
                rem: { minutes: 110, count: 8 },
                wake: { minutes: 20, count: 10 },
              },
              data: [
                // Detailed sleep stage data would be here
                // Simplified for this example
              ],
            },
          },
        ],
        summary: {
          totalMinutesAsleep: 460,
          totalTimeInBed: 500,
          totalSleepRecords: 1,
        },
      };
      
      // Convert Fitbit format to our app's format
      const sleepData = convertFitbitSleepToAppFormat(mockFitbitResponse);
      
      // Update last sync time
      if (sleepData) {
        lastSyncTime = new Date();
        localStorage.setItem("fitbit_last_sync", lastSyncTime.toISOString());
      }
      
      return sleepData;
    } catch (error) {
      console.error("Error fetching sleep data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch sleep data from Fitbit.",
        variant: "destructive",
      });
      return null;
    }
  }

  getLastSyncTime(): Date | null {
    const storedSyncTime = localStorage.getItem("fitbit_last_sync");
    if (storedSyncTime) {
      return new Date(storedSyncTime);
    }
    return lastSyncTime;
  }

  shouldSync(): boolean {
    const syncTime = this.getLastSyncTime();
    if (!syncTime) return true;
    
    const now = new Date();
    const lastSync = new Date(syncTime);
    
    // Check if the last sync was yesterday or earlier
    return (
      lastSync.getDate() !== now.getDate() ||
      lastSync.getMonth() !== now.getMonth() ||
      lastSync.getFullYear() !== now.getFullYear()
    );
  }

  async disconnectFitbit(): Promise<boolean> {
    try {
      // In a real app, this would revoke the token via Fitbit API
      console.log("Disconnecting Fitbit account");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Clear stored credentials and sync time
      localStorage.removeItem("fitbit_credentials");
      localStorage.removeItem("fitbit_last_sync");
      lastSyncTime = null;
      
      return true;
    } catch (error) {
      console.error("Error disconnecting Fitbit:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect your Fitbit account. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }
}

export const fitbitService = new FitbitService();
