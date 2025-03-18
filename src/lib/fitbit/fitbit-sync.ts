
/**
 * Manages Fitbit sync operations and state
 */
class FitbitSyncService {
  // Store the last sync time
  private lastSyncTime: Date | null = null;

  /**
   * Updates the last sync time to now
   */
  updateLastSyncTime(): void {
    this.lastSyncTime = new Date();
    localStorage.setItem("fitbit_last_sync", this.lastSyncTime.toISOString());
  }

  /**
   * Retrieves the last sync time
   */
  getLastSyncTime(): Date | null {
    const storedSyncTime = localStorage.getItem("fitbit_last_sync");
    if (storedSyncTime) {
      return new Date(storedSyncTime);
    }
    return this.lastSyncTime;
  }

  /**
   * Determines if a sync is needed based on the last sync time
   */
  shouldSync(): boolean {
    const syncTime = this.getLastSyncTime();
    if (!syncTime) return true;
    
    const now = new Date();
    const lastSync = new Date(syncTime);
    
    // Check if the last sync was yesterday or earlier
    return (
      lastSync.getDate() !== now.getDate() ||
      lastSync.getMonth() !== now.getMonth() ||
      lastSync.getFullYear() !== now.getFullYear()
    );
  }
}

export const fitbitSync = new FitbitSyncService();
