
import { useState, useEffect } from "react";
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

  const fetchData = async () => {
    try {
      const userData = await userService.getCurrentUser();
      
      let sleepData;
      
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFitbitConnect = (updatedUser: User) => {
    setUser(updatedUser);
    
    // If the user disconnected Fitbit, we should refresh the sleep data
    if (!updatedUser.fitbitConnected) {
      fetchData();
    }
  };

  return {
    user,
    sleepData,
    isLoading,
    fetchData,
    handleFitbitConnect
  };
};
