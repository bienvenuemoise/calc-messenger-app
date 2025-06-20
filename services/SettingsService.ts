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

interface Settings {
  secretCode: string;
  emergencyCode?: string;
  autoLockTime: number;
}

interface AppSettings {
  notifications: boolean;
  soundEnabled: boolean;
  hideLastSeen: boolean;
  chatWallpaper: string;
  theme: 'light' | 'dark';
}

const SETTINGS_KEY = 'app_settings';
const APP_SETTINGS_KEY = 'app_ui_settings';

const DEFAULT_SETTINGS: Settings = {
  secretCode: '12345',
  autoLockTime: 5 * 60 * 1000, // 5 minutes
};

const DEFAULT_APP_SETTINGS: AppSettings = {
  notifications: true,
  soundEnabled: true,
  hideLastSeen: false,
  chatWallpaper: 'default',
  theme: 'dark',
};

export class SettingsService {
  // Paramètres de sécurité (code secret, etc.)
  static async getSettings(): Promise<Settings> {
    try {
      const stored = await storage.getItem(SETTINGS_KEY);
      if (!stored) {
        await this.saveSettings(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  static async saveSettings(settings: Settings): Promise<void> {
    try {
      await storage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  static async updateSecretCode(newCode: string): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const updatedSettings = {
        ...currentSettings,
        secretCode: newCode,
      };
      await this.saveSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating secret code:', error);
      throw error;
    }
  }

  static async resetToDefaults(): Promise<void> {
    try {
      await storage.removeItem(SETTINGS_KEY);
      await storage.removeItem(APP_SETTINGS_KEY);
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw error;
    }
  }

  // Paramètres de l'interface utilisateur
  static async getAppSettings(): Promise<AppSettings> {
    try {
      const stored = await storage.getItem(APP_SETTINGS_KEY);
      if (!stored) {
        await this.saveAppSettings(DEFAULT_APP_SETTINGS);
        return DEFAULT_APP_SETTINGS;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading app settings:', error);
      return DEFAULT_APP_SETTINGS;
    }
  }

  static async saveAppSettings(settings: AppSettings): Promise<void> {
    try {
      await storage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving app settings:', error);
      throw error;
    }
  }

  static async updateAppSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): Promise<void> {
    try {
      const currentSettings = await this.getAppSettings();
      const updatedSettings = {
        ...currentSettings,
        [key]: value,
      };
      await this.saveAppSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating app setting:', error);
      throw error;
    }
  }
}