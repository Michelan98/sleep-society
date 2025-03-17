
import { mockUser } from "./mock-data";

// This is a mock service that simulates authentication functionality
// In a real app, this would make API calls to your backend

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  private tokenKey = "sleepsync_auth_token";
  private userKey = "sleepsync_user";
  
  async login(data: LoginData): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, validate credentials with server
    // For mock, any credentials will work but we'll check format
    if (!data.email || !data.password) {
      throw new Error("Invalid credentials");
    }
    
    // Mock successful login
    const token = `mock_token_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store auth data
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(mockUser));
    
    return;
  }
  
  async signup(data: SignupData): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate data
    if (!data.name || !data.email || !data.password) {
      throw new Error("All fields are required");
    }
    
    // Mock successful signup
    const token = `mock_token_${Math.random().toString(36).substr(2, 9)}`;
    const user = {
      ...mockUser,
      name: data.name,
      email: data.email
    };
    
    // Store auth data
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    
    return;
  }
  
  async logout(): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove auth data
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    
    return;
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

export const authService = new AuthService();
