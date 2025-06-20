import { useState, useEffect } from 'react';
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
  },
  default: require('@react-native-async-storage/async-storage').default,
});

const SECRET_MODE_KEY = 'secret_mode_active';
const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes au lieu de 5

export function useSecretMode() {
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadSecretModeState();
  }, []);

  useEffect(() => {
    if (isSecretMode) {
      startInactivityTimer();
    } else {
      clearInactivityTimer();
    }

    return () => clearInactivityTimer();
  }, [isSecretMode]);

  const loadSecretModeState = async () => {
    try {
      const stored = await storage.getItem(SECRET_MODE_KEY);
      if (stored === 'true') {
        setIsSecretMode(true);
      }
    } catch (error) {
      console.error('Error loading secret mode state:', error);
    }
  };

  const activateSecretMode = async () => {
    try {
      console.log('Activating secret mode...');
      await storage.setItem(SECRET_MODE_KEY, 'true');
      setIsSecretMode(true);
      console.log('Secret mode activated successfully');
    } catch (error) {
      console.error('Error activating secret mode:', error);
    }
  };

  const deactivateSecretMode = async () => {
    try {
      console.log('Deactivating secret mode...');
      await storage.setItem(SECRET_MODE_KEY, 'false');
      setIsSecretMode(false);
      console.log('Secret mode deactivated successfully');
    } catch (error) {
      console.error('Error deactivating secret mode:', error);
    }
  };

  const startInactivityTimer = () => {
    clearInactivityTimer();
    const timer = setTimeout(() => {
      console.log('Inactivity timeout reached, deactivating secret mode');
      deactivateSecretMode();
    }, INACTIVITY_TIMEOUT);
    setInactivityTimer(timer);
  };

  const clearInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
  };

  const resetInactivityTimer = () => {
    if (isSecretMode) {
      startInactivityTimer();
    }
  };

  return {
    isSecretMode,
    activateSecretMode,
    deactivateSecretMode,
    resetInactivityTimer,
  };
}