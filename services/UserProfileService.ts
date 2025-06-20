import { Platform } from 'react-native';

// Pour le web, on utilise localStorage au lieu d'AsyncStorage
const storage = Platform.select({
  web: {
    getItem: async (key: string) => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: async (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Ignore errors
      }
    },
    removeItem: async (key: string) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // Ignore errors
      }
    },
  },
  default: require('@react-native-async-storage/async-storage').default,
});

interface UserProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  avatar?: string;
  status: string;
  statusType: 'available' | 'busy' | 'away' | 'custom';
  createdAt: Date;
  updatedAt: Date;
}

const USER_PROFILE_KEY = 'user_profile';

const DEFAULT_PROFILE: UserProfile = {
  id: '1',
  name: 'Mon Profil',
  phoneNumber: '+33 6 12 34 56 78',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  status: 'Disponible',
  statusType: 'available',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export class UserProfileService {
  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      const stored = await storage.getItem(USER_PROFILE_KEY);
      if (!stored) {
        // Créer un profil par défaut lors du premier accès
        await this.saveUserProfile(DEFAULT_PROFILE);
        return DEFAULT_PROFILE;
      }

      const profile = JSON.parse(stored);
      return {
        ...profile,
        createdAt: new Date(profile.createdAt),
        updatedAt: new Date(profile.updatedAt),
      };
    } catch (error) {
      console.error('Error loading user profile:', error);
      return DEFAULT_PROFILE;
    }
  }

  static async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      const profileToStore = {
        ...profile,
        updatedAt: new Date(),
        createdAt: profile.createdAt || new Date(),
      };

      await storage.setItem(USER_PROFILE_KEY, JSON.stringify(profileToStore));
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  }

  static async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const currentProfile = await this.getUserProfile();
      if (!currentProfile) {
        throw new Error('No profile found');
      }

      const updatedProfile = {
        ...currentProfile,
        ...updates,
        updatedAt: new Date(),
      };

      await this.saveUserProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  static async updateAvatar(avatarUri: string): Promise<void> {
    try {
      await this.updateUserProfile({ avatar: avatarUri });
    } catch (error) {
      console.error('Error updating avatar:', error);
      throw error;
    }
  }

  static async updateStatus(status: string, statusType: UserProfile['statusType']): Promise<void> {
    try {
      await this.updateUserProfile({ status, statusType });
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }

  static async clearUserProfile(): Promise<void> {
    try {
      await storage.removeItem(USER_PROFILE_KEY);
    } catch (error) {
      console.error('Error clearing user profile:', error);
      throw error;
    }
  }
}