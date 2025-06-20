import * as Crypto from 'expo-crypto';

const ENCRYPTION_KEY = 'calc_secret_key_2024';

export const encryptMessage = async (message: string): Promise<string> => {
  try {
    // Simple encoding for demonstration
    // In production, use proper encryption
    const encoded = btoa(encodeURIComponent(message + ENCRYPTION_KEY));
    return encoded;
  } catch (error) {
    console.error('Encryption error:', error);
    return message;
  }
};

export const decryptMessage = async (encryptedMessage: string): Promise<string> => {
  try {
    // Simple decoding for demonstration
    // In production, use proper decryption
    const decoded = decodeURIComponent(atob(encryptedMessage));
    return decoded.replace(ENCRYPTION_KEY, '');
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedMessage;
  }
};

export const generateHash = async (input: string): Promise<string> => {
  try {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      input
    );
    return hash;
  } catch (error) {
    console.error('Hash generation error:', error);
    return input;
  }
};