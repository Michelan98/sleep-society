
import { FitbitSleepResponse } from "@/types/fitbit";
import { SleepData } from "@/types/sleep";
import { toast } from "@/hooks/use-toast";
import { fitbitDataConverters } from "./fitbit-converters";
import { fitbitSync } from "./fitbit-sync";

/**
 * Handles Fitbit data fetching operations
 */
class FitbitDataService {
  /**
   * Fetches sleep data from Fitbit API
   */
  async getSleepData(date: string = 'today'): Promise<SleepData | null> {
    try {
      // In a production app, this would make a real API call to Fitbit
      console.log(`Fetching sleep data for ${date}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create mock Fitbit sleep response in the format that the real API would return
      const mockFitbitResponse: FitbitSleepResponse = {
        sleep: [
          {
            id: "mock_sleep_id_" + Date.now(),
            logId: "mock_log_id_" + Date.now(),
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 28800000).toISOString(), // 8 hours later
            duration: 28800000, // 8 hours in milliseconds
            efficiency: 90,
            minutesAsleep: 460,
            minutesAwake: 20,
            minutesAfterWakeup: 5,
            minutesToFallAsleep: 15,
            timeInBed: 500,
            levels: {
              summary: {
                deep: { minutes: 100, count: 4 },
                light: { minutes: 250, count: 20 },
                rem: { minutes: 110, count: 8 },
                wake: { minutes: 20, count: 10 },
              },
              data: [
                // Detailed sleep stage data would be here
                // Simplified for this example
              ],
            },
          },
        ],
        summary: {
          totalMinutesAsleep: 460,
          totalTimeInBed: 500,
          totalSleepRecords: 1,
        },
      };
      
      // Convert Fitbit format to our app's format
      const sleepData = fitbitDataConverters.convertFitbitSleepToAppFormat(mockFitbitResponse);
      
      // Update last sync time
      if (sleepData) {
        fitbitSync.updateLastSyncTime();
      }
      
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
}

export const fitbitDataService = new FitbitDataService();
