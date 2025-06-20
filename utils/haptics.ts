import { Platform } from 'react-native';

export const playHaptic = () => {
  if (Platform.OS !== 'web') {
    // Only runs on iOS/Android
    const Haptics = require('expo-haptics');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } else {
    // Web alternative - subtle visual feedback could be added here
    console.log('Haptic feedback (web simulation)');
  }
};

export const playMediumHaptic = () => {
  if (Platform.OS !== 'web') {
    const Haptics = require('expo-haptics');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } else {
    console.log('Medium haptic feedback (web simulation)');
  }
};

export const playHeavyHaptic = () => {
  if (Platform.OS !== 'web') {
    const Haptics = require('expo-haptics');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } else {
    console.log('Heavy haptic feedback (web simulation)');
  }
};