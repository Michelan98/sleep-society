
import { FitbitCredentials, FitbitSleepResponse } from "@/types/fitbit";
import { SleepData } from "@/types/sleep";
import { toast } from "@/components/ui/use-toast";

// Server-side endpoint URLs
const API_BASE_URL = "/api"; // This would point to your backend API
const REDIRECT_URI = window.location.origin + "/fitbit-callback";

class FitbitService {
  // Auth utilities
  getAuthUrl(): string {
    // This will now redirect to a server-side endpoint that initiates the OAuth flow
    return `${API_BASE_URL}/fitbit/authorize?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  }

  async exchangeCodeForToken(code: string): Promise<FitbitCredentials | null> {
    try {
      // Now making a call to server-side endpoint to handle the token exchange
      const response = await fetch(`${API_BASE_URL}/fitbit/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, redirect_uri: REDIRECT_URI }),
        credentials: "include", // Important to include cookies for auth
      });

      if (!response.ok) {
        throw new Error("Failed to exchange code for token");
      }

      // Server will handle storing the refresh token securely
      // and only send back what the client needs to know
      const credentials = await response.json();
      return credentials;
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

  // We no longer need to store refresh tokens on the client
  // or implement token refresh logic here, as that's handled server-side

  // Data fetching
  async getSleepData(date: string = 'today'): Promise<SleepData | null> {
    try {
      // Server handles token validation and refreshing
      const response = await fetch(`${API_BASE_URL}/fitbit/sleep?date=${date}`, {
        credentials: "include", // Important to include cookies for auth
      });

      if (!response.ok) {
        // If unauthorized, could redirect to reconnect Fitbit
        if (response.status === 401) {
          toast({
            title: "Authentication Error",
            description: "Your Fitbit connection needs to be renewed.",
            variant: "destructive",
          });
          return null;
        }
        throw new Error("Failed to fetch sleep data");
      }

      const sleepData = await response.json();
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

  async disconnectFitbit(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/fitbit/disconnect`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to disconnect Fitbit");
      }

      return true;
    } catch (error) {
      console.error("Error disconnecting Fitbit:", error);
      return false;
    }
  }
}

export const fitbitService = new FitbitService();
