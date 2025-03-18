
import { fitbitAuthService } from './fitbit-auth';
import { fitbitDataService } from './fitbit-data';
import { fitbitSync } from './fitbit-sync';

/**
 * Main Fitbit service that combines auth, data, and sync capabilities
 */
class FitbitService {
  // Auth-related methods
  getAuthUrl = fitbitAuthService.getAuthUrl.bind(fitbitAuthService);
  validateState = fitbitAuthService.validateState.bind(fitbitAuthService);
  exchangeCodeForToken = fitbitAuthService.exchangeCodeForToken.bind(fitbitAuthService);
  disconnectFitbit = fitbitAuthService.disconnectFitbit.bind(fitbitAuthService);

  // Data-related methods
  getSleepData = fitbitDataService.getSleepData.bind(fitbitDataService);

  // Sync-related methods
  getLastSyncTime = fitbitSync.getLastSyncTime.bind(fitbitSync);
  shouldSync = fitbitSync.shouldSync.bind(fitbitSync);
}

export const fitbitService = new FitbitService();
