
import { useState, useEffect, useCallback } from "react";
import { userService } from "@/lib/user-service";
import { sleepService } from "@/lib/sleep-service";
import { fitbitService } from "@/lib/fitbit-service";
import { User } from "@/types/user";
import { SleepData } from "@/types/sleep";
import { toast } from "@/hooks/use-toast";

export const useDashboardData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from the appropriate service
  const fetchUserData = useCallback(async (): Promise<User> => {
    return await userService.getCurrentUser();
  }, []);

  // Fetch sleep data with fallback strategy
  const fetchSleepData = useCallback(async (userData: User): Promise<SleepData | null> => {
    let sleepData = null;
    
    // If user has Fitbit connected, try to get data from there
    if (userData.fitbitConnected) {
      console.log("Fetching sleep data from Fitbit");
      sleepData = await fitbitService.getSleepData();
    }
    
    // If no Fitbit data or not connected, fallback to regular sleep data
    if (!sleepData) {
      console.log("Falling back to regular sleep data");
      sleepData = await sleepService.getLatestSleepData();
    }
    
    return sleepData;
  }, []);

  // Main data fetching function 
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await fetchUserData();
      const sleepData = await fetchSleepData(userData);
      
      setUser(userData);
      setSleepData(sleepData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load your sleep data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserData, fetchSleepData]);

  // Handle Fitbit connection status change
  const handleFitbitConnect = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    
    // If the user disconnected Fitbit, we should refresh the sleep data
    if (!updatedUser.fitbitConnected) {
      fetchData();
    }
  }, [fetchData]);

  // Initial data fetch on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    user,
    sleepData,
    isLoading,
    fetchData,
    handleFitbitConnect
  };
};
