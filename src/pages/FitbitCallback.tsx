
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { fitbitService } from "@/lib/fitbit-service";
import { userService } from "@/lib/user-service";
import { toast } from "@/components/ui/use-toast";

const FitbitCallback = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get the auth code from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const error = urlParams.get("error");

        if (error) {
          throw new Error(`Authorization error: ${error}`);
        }

        if (!code) {
          throw new Error("No authorization code found in the URL");
        }

        // Exchange the code for access token
        const credentials = await fitbitService.exchangeCodeForToken(code);
        if (!credentials) {
          throw new Error("Failed to obtain access token");
        }

        // Update user's profile with Fitbit credentials
        const updatedUser = await userService.updateUserProfile({
          fitbitConnected: true,
          fitbitCredentials: credentials
        });

        // Fetch initial sleep data
        const sleepData = await fitbitService.getSleepData(credentials);

        toast({
          title: "Fitbit Connected",
          description: "Your Fitbit account has been successfully connected.",
        });

        // Navigate back to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Error processing Fitbit callback:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        toast({
          title: "Connection Failed",
          description: "Failed to connect your Fitbit account. Please try again.",
          variant: "destructive",
        });

        // Navigate back to dashboard after a delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        {isProcessing ? (
          <>
            <Loader2 className="h-12 w-12 text-sleep-purple animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Connecting to Fitbit</h1>
            <p className="text-muted-foreground">Please wait while we connect your Fitbit account...</p>
          </>
        ) : error ? (
          <>
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Connection Failed</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <p className="text-sm">Redirecting you back to the dashboard...</p>
          </>
        ) : (
          <>
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h1 className="text-2xl font-bold mb-2">Successfully Connected</h1>
            <p className="text-muted-foreground mb-4">Your Fitbit account has been successfully connected to SleepSync.</p>
            <p className="text-sm">Redirecting you back to the dashboard...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FitbitCallback;
