
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { fitbitService } from "@/lib/fitbit-service";
import { userService } from "@/lib/user-service";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const FitbitCallback = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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

        console.log("Exchanging code for token...");
        
        // Exchange the code for access token via server-side endpoint
        const credentials = await fitbitService.exchangeCodeForToken(code);
        if (!credentials) {
          throw new Error("Failed to obtain access token");
        }

        console.log("Successfully obtained credentials");

        // Update user's profile to indicate Fitbit is connected
        await userService.updateUserProfile({
          fitbitConnected: true
        });

        setSuccess(true);
        
        toast({
          title: "Fitbit Connected",
          description: "Your Fitbit account has been successfully connected.",
        });

        // Navigate back to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        console.error("Error processing Fitbit callback:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
        
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full p-6 rounded-lg border shadow-md">
        {isProcessing ? (
          <>
            <Loader2 className="h-12 w-12 text-sleep-purple animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Connecting to Fitbit</h1>
            <p className="text-muted-foreground">Please wait while we connect your Fitbit account...</p>
          </>
        ) : error ? (
          <>
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Connection Failed</h1>
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <p className="text-sm">Redirecting you back to the dashboard...</p>
          </>
        ) : (
          <>
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Successfully Connected</h1>
            <Alert className="mb-4 border-green-200 bg-green-50">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your Fitbit account has been successfully connected to SleepSync.</AlertDescription>
            </Alert>
            <p className="text-sm">Redirecting you back to the dashboard...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FitbitCallback;
