
import { FitbitSleepResponse } from "@/types/fitbit";
import { SleepData } from "@/types/sleep";

/**
 * Utilities for converting Fitbit data formats to app formats
 */
class FitbitDataConverters {
  /**
   * Converts Fitbit sleep data format to the app's SleepData format
   */
  convertFitbitSleepToAppFormat(fitbitData: FitbitSleepResponse): SleepData | null {
    if (!fitbitData.sleep || fitbitData.sleep.length === 0) {
      return null;
    }

    const sleepEntry = fitbitData.sleep[0]; // Use the most recent sleep entry
    const summary = sleepEntry.levels.summary;

    // Calculate sleep percentages
    const totalMinutes = (summary.deep.minutes || 0) + 
                        (summary.light.minutes || 0) + 
                        (summary.rem.minutes || 0) + 
                        (summary.wake.minutes || 0);
    
    const deepPercentage = totalMinutes > 0 ? Math.round((summary.deep.minutes / totalMinutes) * 100) : 0;
    const remPercentage = totalMinutes > 0 ? Math.round((summary.rem.minutes / totalMinutes) * 100) : 0;
    const lightPercentage = totalMinutes > 0 ? Math.round((summary.light.minutes / totalMinutes) * 100) : 0;
    
    // Calculate duration in hours and minutes
    const durationInMinutes = sleepEntry.duration / 60000; // Convert ms to minutes
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.round(durationInMinutes % 60);
    
    // Calculate sleep quality (simplified algorithm)
    // Higher percentages of deep and REM sleep are associated with better sleep quality
    const qualityScore = Math.min(100, Math.round(
      (deepPercentage * 1.5) + (remPercentage * 1.2) + (lightPercentage * 0.5)
    ));
    
    // Calculate energy score based on sleep quality and duration
    // This is a simplified scoring model
    const idealSleepHours = 8;
    const durationFactor = Math.min(1, durationInMinutes / (idealSleepHours * 60));
    const energyScore = Math.round(qualityScore * durationFactor);

    return {
      id: sleepEntry.logId,
      userId: "fitbit-user", // Placeholder, would be associated with the app user
      date: sleepEntry.startTime,
      duration: `${hours}h ${minutes}m`,
      quality: `${qualityScore}%`,
      energyScore: energyScore.toString(),
      deepSleepPercentage: deepPercentage,
      remSleepPercentage: remPercentage,
      lightSleepPercentage: lightPercentage,
      awakeTime: summary.wake.minutes || 0,
      heartRateAvg: 0, // Fitbit sleep data doesn't include heart rate directly
      note: "Imported from Fitbit",
    };
  }
}

export const fitbitDataConverters = new FitbitDataConverters();
