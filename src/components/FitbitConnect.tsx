
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user";
import { fitbitService } from "@/lib/fitbit-service";
import { userService } from "@/lib/user-service";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Activity, RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface FitbitConnectProps {
  user: User | null;
  onConnect: (updatedUser: User) => void;
  onDataRefresh?: () => void;
}

const FitbitConnect = ({ user, onConnect, onDataRefresh }: FitbitConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  useEffect(() => {
    // Get the last sync time when the component mounts
    setLastSyncTime(fitbitService.getLastSyncTime());

    // Check if we need to sync data based on the last sync time
    if (user?.fitbitConnected && fitbitService.shouldSync()) {
      handleSyncData();
    }
    
    // Set up a daily check for sync
    const dailyCheckInterval = setInterval(() => {
      if (user?.fitbitConnected && fitbitService.shouldSync()) {
        handleSyncData();
      }
    }, 3600000); // Check every hour if a sync is needed
    
    return () => clearInterval(dailyCheckInterval);
  }, [user?.fitbitConnected]);

  const handleConnect = () => {
    try {
      setIsConnecting(true);
      const authUrl = fitbitService.getAuthUrl();
      console.log("Redirecting to Fitbit auth URL:", authUrl);
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error initiating Fitbit connection:", error);
      setIsConnecting(false);
      toast({
        title: "Connection Error",
        description: "Failed to initiate Fitbit connection. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSyncData = async () => {
    if (!user?.fitbitConnected) return;
    
    setIsSyncing(true);
    try {
      const sleepData = await fitbitService.getSleepData();
      
      if (sleepData) {
        setLastSyncTime(fitbitService.getLastSyncTime());
        
        toast({
          title: "Data Synced",
          description: "Your Fitbit sleep data has been updated.",
        });
        
        if (onDataRefresh) {
          onDataRefresh();
        }
      }
    } catch (error) {
      console.error("Error syncing Fitbit data:", error);
      toast({
        title: "Sync Error",
        description: "Failed to sync data from Fitbit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    if (!user) return;
    
    setIsDisconnecting(true);
    try {
      console.log("Disconnecting Fitbit...");
      const success = await fitbitService.disconnectFitbit();
      
      if (success) {
        console.log("Successfully disconnected from Fitbit");
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
            <p className="text-xs text-muted-foreground">
              Last synced: {lastSyncTime ? format(lastSyncTime, 'PPp') : 'Not yet synced'}
            </p>
          </div>
        ) : (
          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="text-sm mb-2">
              Connect your Fitbit account to automatically import your sleep data into SleepSync.
            </p>
            <p className="text-xs text-muted-foreground">
              We'll securely handle your Fitbit authentication.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {user.fitbitConnected ? (
          <>
            <Button 
              variant="default" 
              className="w-full bg-sleep-blue hover:bg-sleep-blue/90"
              onClick={handleSyncData}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing Data...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </>
              )}
            </Button>
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
          </>
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
