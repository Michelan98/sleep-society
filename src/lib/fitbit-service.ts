import { FitbitCredentials, FitbitSleepResponse } from "@/types/fitbit";
import { SleepData } from "@/types/sleep";
import { toast } from "@/components/ui/use-toast";

// Normally these would be environment variables
const FITBIT_CLIENT_ID = "YOUR_FITBIT_CLIENT_ID"; // Replace with your actual client ID
const REDIRECT_URI = window.location.origin + "/fitbit-callback";

class FitbitService {
  // Auth utilities
  getAuthUrl(): string {
    const scopes = "sleep";
    return `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${FITBIT_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scopes}`;
  }

  // This would normally be done server-side to keep client secret safe
  async exchangeCodeForToken(code: string): Promise<FitbitCredentials | null> {
    try {
      // In a real app, this would be a server-side endpoint
      // that exchanges the code for tokens
      console.log("Exchanging code for token", code);
      
      // Mock response for now
      const mockCredentials: FitbitCredentials = {
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
        expiresAt: Date.now() + 28800000, // 8 hours from now
        userId: "mock_user_id"
      };
      
      return mockCredentials;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      toast({
        title: "Error",
        description: "Failed to connect to Fitbit. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  }

  async refreshToken(credentials: FitbitCredentials): Promise<FitbitCredentials | null> {
    try {
      // This would be a server-side endpoint in a real app
      console.log("Refreshing token for user", credentials.userId);
      
      // Mock refreshed credentials
      const refreshedCredentials: FitbitCredentials = {
        ...credentials,
        accessToken: "new_mock_access_token",
        expiresAt: Date.now() + 28800000, // 8 hours from now
      };
      
      return refreshedCredentials;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }

  // Data fetching
  async getSleepData(credentials: FitbitCredentials, date: string = 'today'): Promise<SleepData | null> {
    try {
      if (Date.now() > credentials.expiresAt) {
        const refreshedCredentials = await this.refreshToken(credentials);
        if (!refreshedCredentials) {
          throw new Error("Failed to refresh token");
        }
        credentials = refreshedCredentials;
        
        // In a real app, you would update the user's credentials in storage/state
      }

      // In a real app, this would be an actual API call
      console.log(`Fetching sleep data for date: ${date}, user: ${credentials.userId}`);
      
      // Mock Fitbit response
      const mockFitbitResponse: FitbitSleepResponse = {
        sleep: [{
          id: "mock_sleep_id",
          logId: "mock_log_id",
          startTime: "2023-05-01T23:00:00.000",
          endTime: "2023-05-02T06:30:00.000",
          duration: 27000000, // 7.5 hours in ms
          efficiency: 92,
          minutesAsleep: 430,
          minutesAwake: 20,
          minutesAfterWakeup: 10,
          minutesToFallAsleep: 8,
          timeInBed: 450,
          levels: {
            summary: {
              deep: { minutes: 85, count: 4 },
              light: { minutes: 240, count: 26 },
              rem: { minutes: 105, count: 8 },
              wake: { minutes: 20, count: 16 }
            },
            data: [] // Omitted for brevity
          }
        }],
        summary: {
          totalMinutesAsleep: 430,
          totalTimeInBed: 450,
          totalSleepRecords: 1
        }
      };

      // Convert Fitbit format to our app's format
      const fitbitData = mockFitbitResponse.sleep[0];
      if (!fitbitData) {
        return null;
      }

      // Calculate energy score based on sleep efficiency and duration
      const durationHours = fitbitData.duration / (1000 * 60 * 60);
      const idealHours = 8; // Ideal hours of sleep
      const durationScore = Math.min(100, (durationHours / idealHours) * 100);
      const energyScore = Math.round((fitbitData.efficiency * 0.6) + (durationScore * 0.4));

      // Format the sleep data for our app
      const sleepData: SleepData = {
        id: fitbitData.id,
        userId: credentials.userId,
        date: new Date(fitbitData.startTime).toISOString(),
        duration: `${Math.floor(fitbitData.duration / (1000 * 60 * 60))}h ${Math.floor((fitbitData.duration / (1000 * 60)) % 60)}m`,
        quality: `${fitbitData.efficiency}%`,
        energyScore: energyScore.toString(),
        deepSleepPercentage: Math.round((fitbitData.levels.summary.deep.minutes / fitbitData.minutesAsleep) * 100),
        remSleepPercentage: Math.round((fitbitData.levels.summary.rem.minutes / fitbitData.minutesAsleep) * 100),
        lightSleepPercentage: Math.round((fitbitData.levels.summary.light.minutes / fitbitData.minutesAsleep) * 100),
        awakeTime: fitbitData.minutesAwake,
        heartRateAvg: 62, // Fitbit doesn't provide this in sleep data, would need another API call
        note: "Data from Fitbit"
      };

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

  async disconnectFitbit(userId: string): Promise<boolean> {
    try {
      // This would be a server-side endpoint in a real app
      console.log("Disconnecting Fitbit for user", userId);
      
      // In a real app, you would revoke the token with Fitbit
      // and update the user record in your database
      
      return true;
    } catch (error) {
      console.error("Error disconnecting Fitbit:", error);
      return false;
    }
  }
}

export const fitbitService = new FitbitService();
