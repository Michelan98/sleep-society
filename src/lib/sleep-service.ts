
import { SleepData, SleepFeedItem, LeaderboardUser } from "@/types/sleep";
import { mockSleepData, mockFeedItems, mockLeaders } from "./mock-data";

// This is a mock service for sleep-related operations
class SleepService {
  async getLatestSleepData(): Promise<SleepData> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In a real app, fetch from API
    return mockSleepData;
  }
  
  async getSleepHistory(days: number = 7): Promise<SleepData[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock history data
    const history: SleepData[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Create some variation in the mock data
      const qualityVariation = Math.floor(Math.random() * 15);
      const durationHours = 7 + Math.floor(Math.random() * 2);
      const durationMinutes = Math.floor(Math.random() * 60);
      
      history.push({
        ...mockSleepData,
        id: `sleep-history-${i}`,
        date: date.toISOString(),
        quality: `${Math.max(75, 90 - qualityVariation)}%`,
        duration: `${durationHours}h ${durationMinutes}m`,
        energyScore: `${Math.max(80, 95 - qualityVariation)}`
      });
    }
    
    return history;
  }
  
  async getFeedItems(page: number = 1): Promise<SleepFeedItem[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In a real app, would fetch from API with pagination
    // For mock, just return static data
    return mockFeedItems;
  }
  
  async getLeaderboard(): Promise<LeaderboardUser[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return mockLeaders;
  }
  
  async recordSleepData(data: Partial<SleepData>): Promise<SleepData> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, would send to API
    // For mock, just return combined with mock data
    return {
      ...mockSleepData,
      ...data,
      id: `sleep-${Date.now()}`,
      date: new Date().toISOString()
    };
  }
}

export const sleepService = new SleepService();
