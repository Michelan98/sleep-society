
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinedAt: string;
  followers: number;
  following: number;
  fitbitConnected?: boolean;
  fitbitCredentials?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    userId: string;
  };
}
