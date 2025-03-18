
import { FitbitCredentials, FitbitSleepResponse } from "@/types/fitbit";
import { SleepData } from "@/types/sleep";
import { toast } from "@/components/ui/use-toast";

// Mock data to simulate Fitbit sleep data
const mockSleepData: SleepData = {
  date: new Date().toISOString(),
  duration: "7h 45m",
  quality: "92%",
  deepSleep: "1h 32m",
  remSleep: "1h 58m",
  lightSleep: "4h 15m",
  awake: "12m",
  energyScore: "95",
  source: "Fitbit",
};

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
          access_token: "mock_access_token",
          user_id: "mock_user_id",
          expires_in: 28800,
          scope: "sleep activity",
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

  async disconnectFitbit(): Promise<boolean> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log("Mock Fitbit API: Disconnecting Fitbit account");
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
