
import { FitbitCredentials, FitbitSleepResponse } from "@/types/fitbit";
import { SleepData } from "@/types/sleep";
import { toast } from "@/components/ui/use-toast";

// Mock data to simulate Fitbit sleep data
const mockSleepData: SleepData = {
  id: "mock-sleep-id",
  userId: "mock-user-id",
  date: new Date().toISOString(),
  duration: "7h 45m",
  quality: "92%",
  energyScore: "95",
  deepSleepPercentage: 20,
  remSleepPercentage: 25,
  lightSleepPercentage: 55,
  awakeTime: 12,
  heartRateAvg: 62,
  note: "Slept well with Fitbit tracking",
};

// Store the last sync time
let lastSyncTime: Date | null = null;

// In a real app, these would point to actual backend endpoints
// For demo purposes, we're implementing client-side mocks
class FitbitService {
  // Auth utilities
  getAuthUrl(): string {
    // In a real app, this would redirect to your backend endpoint
    // For demo, we'll simulate the flow by redirecting directly to our callback
    return `/fitbit-callback?code=mock_auth_code&mock=true`;
  }

  async exchangeCodeForToken(code: string): Promise<FitbitCredentials | null> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, return mock credentials
      if (code === "mock_auth_code") {
        console.log("Mock Fitbit auth flow: Successfully exchanged code for token");
        return {
          accessToken: "mock_access_token",
          refreshToken: "mock_refresh_token",
          expiresAt: Date.now() + 28800000,
          userId: "mock_user_id",
        };
      }
      
      throw new Error("Invalid authorization code");
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a demo app, return mock data
      console.log(`Mock Fitbit API: Fetching sleep data for ${date}`);
      
      // Update last sync time
      lastSyncTime = new Date();
      
      // Return mock data with the requested date
      return {
        ...mockSleepData,
        date: date === 'today' ? new Date().toISOString() : new Date(date).toISOString(),
      };
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
    return lastSyncTime;
  }

  shouldSync(): boolean {
    if (!lastSyncTime) return true;
    
    const now = new Date();
    const lastSync = new Date(lastSyncTime);
    
    // Check if the last sync was yesterday or earlier
    return (
      lastSync.getDate() !== now.getDate() ||
      lastSync.getMonth() !== now.getMonth() ||
      lastSync.getFullYear() !== now.getFullYear()
    );
  }

  async disconnectFitbit(): Promise<boolean> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log("Mock Fitbit API: Disconnecting Fitbit account");
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
