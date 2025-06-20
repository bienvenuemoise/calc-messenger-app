import { Platform } from 'react-native';
import { encryptMessage, decryptMessage } from '@/utils/crypto';

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

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

const MESSAGES_KEY = 'encrypted_messages';

export class MessageService {
  static async saveMessage(message: Message): Promise<void> {
    try {
      const existingMessages = await this.getMessages();
      const encryptedText = await encryptMessage(message.text);
      
      const messageToStore = {
        ...message,
        text: encryptedText,
        timestamp: message.timestamp.toISOString(),
      };

      const updatedMessages = [
        ...(await Promise.all(existingMessages.map(async m => ({
          ...m,
          timestamp: m.timestamp.toISOString(),
          text: await encryptMessage(m.text),
        })))),
        messageToStore
      ];

      await storage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages));

    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }

  static async getMessages(): Promise<Message[]> {
    try {
      const stored = await storage.getItem(MESSAGES_KEY);
      if (!stored) return [];

      const messages = JSON.parse(stored);
      
      const decryptedMessages = await Promise.all(
        messages.map(async (msg: any) => ({
          ...msg,
          text: await decryptMessage(msg.text),
          timestamp: new Date(msg.timestamp),
        }))
      );

      return decryptedMessages;
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  }

  static async clearAllMessages(): Promise<void> {
    try {
      await storage.removeItem(MESSAGES_KEY);
    } catch (error) {
      console.error('Error clearing messages:', error);
      throw error;
    }
  }
}