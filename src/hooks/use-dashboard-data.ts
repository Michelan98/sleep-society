
import { useState, useEffect, useCallback } from "react";
import { userService } from "@/lib/user-service";
import { sleepService } from "@/lib/sleep-service";
import { fitbitService } from "@/lib/fitbit"; // Updated import path
import { User } from "@/types/user";
import { SleepData } from "@/types/sleep";
import { toast } from "@/hooks/use-toast";

export const useDashboardData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"fitbit" | "internal" | null>(null);

  // Fetch user data from the appropriate service
  const fetchUserData = useCallback(async (): Promise<User> => {
    return await userService.getCurrentUser();
  }, []);

  // Fetch sleep data with fallback strategy
  const fetchSleepData = useCallback(async (userData: User): Promise<{data: SleepData | null, source: "fitbit" | "internal" | null}> => {
    let sleepData = null;
    let source: "fitbit" | "internal" | null = null;
    
    // If user has Fitbit connected, try to get data from there
    if (userData.fitbitConnected) {
      console.log("Fetching sleep data from Fitbit");
      sleepData = await fitbitService.getSleepData();
      if (sleepData) {
        source = "fitbit";
      }
    }
    
    // If no Fitbit data or not connected, fallback to regular sleep data
    if (!sleepData) {
      console.log("Falling back to regular sleep data");
      sleepData = await sleepService.getLatestSleepData();
      if (sleepData) {
        source = "internal";
      }
    }
    
    return { data: sleepData, source };
  }, []);

  // Main data fetching function 
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await fetchUserData();
      const { data, source } = await fetchSleepData(userData);
      
      setUser(userData);
      setSleepData(data);
      setDataSource(source);
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

  // Update user function
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  // Refetch data function - alias for fetchData to maintain compatibility
  const refetchData = useCallback(() => {
    return fetchData();
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
    refetchData,
    updateUser,
    dataSource,
    handleFitbitConnect: updateUser
  };
};
