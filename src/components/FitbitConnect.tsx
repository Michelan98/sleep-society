
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user";
import { fitbitService } from "@/lib/fitbit-service";
import { userService } from "@/lib/user-service";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Activity } from "lucide-react";

interface FitbitConnectProps {
  user: User | null;
  onConnect: (updatedUser: User) => void;
}

const FitbitConnect = ({ user, onConnect }: FitbitConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    const authUrl = fitbitService.getAuthUrl();
    window.location.href = authUrl;
  };

  const handleDisconnect = async () => {
    if (!user) return;
    
    setIsDisconnecting(true);
    try {
      const success = await fitbitService.disconnectFitbit();
      if (success) {
        const updatedUser = await userService.updateUserProfile({
          fitbitConnected: false
        });
        
        onConnect(updatedUser);
        toast({
          title: "Disconnected",
          description: "Your Fitbit account has been disconnected.",
        });
      } else {
        throw new Error("Failed to disconnect");
      }
    } catch (error) {
      console.error("Error disconnecting Fitbit:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect your Fitbit account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDisconnecting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="border border-border/50 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Activity className="h-5 w-5 mr-2 text-sleep-purple" />
          Fitbit Integration
        </CardTitle>
        <CardDescription>
          Connect your Fitbit account to automatically sync your sleep data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user.fitbitConnected ? (
          <div className="bg-sleep-purple/10 p-4 rounded-lg">
            <p className="text-sm mb-2">
              Your Fitbit account is connected. Your sleep data will be automatically synced.
            </p>
          </div>
        ) : (
          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="text-sm mb-2">
              Connect your Fitbit account to automatically import your sleep data into SleepSync.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {user.fitbitConnected ? (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleDisconnect}
            disabled={isDisconnecting}
          >
            {isDisconnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Disconnecting...
              </>
            ) : (
              "Disconnect Fitbit"
            )}
          </Button>
        ) : (
          <Button 
            className="w-full bg-sleep-purple hover:bg-sleep-purple/90"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Fitbit"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FitbitConnect;
