
import { FitbitCredentials } from "@/types/fitbit";
import { toast } from "@/hooks/use-toast";

// Fitbit OAuth configuration
const FITBIT_CLIENT_ID = "23Q4N8";
const FITBIT_AUTH_URL = "https://www.fitbit.com/oauth2/authorize";
const FITBIT_TOKEN_URL = "https://api.fitbit.com/oauth2/token";
const REDIRECT_URI = "https://sleep-society.lovable.app/dashboard";

/**
 * Handles Fitbit authentication operations like authorization URL generation,
 * token exchange, and credential management.
 */
class FitbitAuthService {
  /**
   * Generates the authorization URL for Fitbit OAuth flow
   */
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
  
  /**
   * Generates a random state parameter for CSRF protection
   */
  private generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15);
  }
  
  /**
   * Validates state parameter to prevent CSRF attacks
   */
  validateState(returnedState: string): boolean {
    const originalState = localStorage.getItem("fitbit_auth_state");
    // Clear state from storage after validation
    localStorage.removeItem("fitbit_auth_state");
    return originalState === returnedState;
  }

  /**
   * Exchanges an authorization code for access tokens
   */
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

  /**
   * Disconnects the Fitbit account by removing stored credentials
   */
  async disconnectFitbit(): Promise<boolean> {
    try {
      // In a real app, this would revoke the token via Fitbit API
      console.log("Disconnecting Fitbit account");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Clear stored credentials and sync time
      localStorage.removeItem("fitbit_credentials");
      localStorage.removeItem("fitbit_last_sync");
      
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

export const fitbitAuthService = new FitbitAuthService();
