
import { User } from "@/types/user";
import { mockUser } from "./mock-data";

// This is a mock service for user-related operations
class UserService {
  async getCurrentUser(): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In a real app, get from API using the stored auth token
    const storedUser = localStorage.getItem("sleepsync_user");
    
    if (storedUser) {
      return JSON.parse(storedUser) as User;
    }
    
    // Fallback to mock user
    return mockUser;
  }
  
  async updateUserProfile(updates: Partial<User>): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const currentUser = await this.getCurrentUser();
    const updatedUser = { ...currentUser, ...updates };
    
    // Update local storage
    localStorage.setItem("sleepsync_user", JSON.stringify(updatedUser));
    
    return updatedUser;
  }
  
  async getUserById(id: string): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Mock user lookup - in real app would fetch from API
    return {
      ...mockUser,
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`
    };
  }
}

export const userService = new UserService();
