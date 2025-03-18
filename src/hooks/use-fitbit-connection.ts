
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { fitbitService } from "@/lib/fitbit"; // Updated import path
import { userService } from "@/lib/user-service";
import { toast } from "@/hooks/use-toast";

export function useFitbitConnection({ 
  user, 
  onConnect, 
  onDataRefresh 
}: { 
  user: User | null;
  onConnect: (updatedUser: User) => void;
  onDataRefresh?: () => void;
}) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  useEffect(() => {
    // Get the last sync time when the component mounts
    const storedSyncTime = fitbitService.getLastSyncTime();
    setLastSyncTime(storedSyncTime);

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

  return {
    isConnecting,
    isDisconnecting,
    isSyncing,
    lastSyncTime,
    handleConnect,
    handleSyncData,
    handleDisconnect
  };
}
