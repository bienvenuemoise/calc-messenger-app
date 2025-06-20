import { Platform } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Contact } from '@/components/ContactList';

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

const CONTACTS_KEY = 'app_contacts';
const CONVERSATIONS_KEY = 'app_conversations';

// Interface pour les conversations actives
export interface Conversation {
  contactId: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
}

export class ContactService {
  // Demander les permissions et récupérer les contacts du téléphone
  static async getPhoneContacts(): Promise<Contact[]> {
    if (Platform.OS === 'web') {
      // Sur le web, retourner des contacts de démonstration
      return this.getDemoContacts();
    }

    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission refusée pour accéder aux contacts');
        return this.getDemoContacts();
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        sort: Contacts.SortTypes.FirstName,
      });

      // Convertir les contacts du téléphone au format de l'app
      const appContacts: Contact[] = data
        .filter(contact => contact.name && contact.phoneNumbers && contact.phoneNumbers.length > 0)
        .map(contact => ({
          id: contact.id || Math.random().toString(),
          name: contact.name || 'Contact sans nom',
          phoneNumber: contact.phoneNumbers?.[0]?.number || '',
          avatar: contact.imageAvailable ? contact.image?.uri : undefined,
          isOnline: Math.random() > 0.5, // Statut aléatoire pour la démo
        }))
        .slice(0, 20); // Limiter à 20 contacts pour la démo

      return appContacts;
    } catch (error) {
      console.error('Erreur lors de la récupération des contacts:', error);
      return this.getDemoContacts();
    }
  }

  // Contacts de démonstration pour le web ou en cas d'erreur
  static getDemoContacts(): Contact[] {
    return [
      {
        id: '1',
        name: 'Sarah Martin',
        phoneNumber: '+33 6 12 34 56 78',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isOnline: true,
      },
      {
        id: '2',
        name: 'Thomas Dubois',
        phoneNumber: '+33 6 23 45 67 89',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isOnline: false,
      },
      {
        id: '3',
        name: 'Emma Leroy',
        phoneNumber: '+33 6 34 56 78 90',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isOnline: true,
      },
      {
        id: '4',
        name: 'Lucas Bernard',
        phoneNumber: '+33 6 45 67 89 01',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isOnline: false,
      },
      {
        id: '5',
        name: 'Julie Moreau',
        phoneNumber: '+33 6 56 78 90 12',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isOnline: true,
      },
      {
        id: '6',
        name: 'Antoine Rousseau',
        phoneNumber: '+33 6 67 89 01 23',
        isOnline: false,
      },
      {
        id: '7',
        name: 'Camille Petit',
        phoneNumber: '+33 6 78 90 12 34',
        isOnline: true,
      },
      {
        id: '8',
        name: 'Maxime Durand',
        phoneNumber: '+33 6 89 01 23 45',
        isOnline: false,
      },
    ];
  }

  // Récupérer les contacts avec les conversations
  static async getContacts(): Promise<Contact[]> {
    try {
      const phoneContacts = await this.getPhoneContacts();
      const conversations = await this.getConversations();

      // Fusionner les contacts avec les données de conversation
      const contactsWithConversations = phoneContacts.map(contact => {
        const conversation = conversations.find(conv => conv.contactId === contact.id);
        return {
          ...contact,
          lastMessage: conversation?.lastMessage,
          lastMessageTime: conversation?.lastMessageTime,
          unreadCount: conversation?.unreadCount || 0,
        };
      });

      // Trier par dernière activité (conversations actives en premier)
      return contactsWithConversations.sort((a, b) => {
        if (a.lastMessageTime && b.lastMessageTime) {
          return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
        }
        if (a.lastMessageTime) return -1;
        if (b.lastMessageTime) return 1;
        return a.name.localeCompare(b.name);
      });
    } catch (error) {
      console.error('Error loading contacts:', error);
      return this.getDemoContacts();
    }
  }

  // Récupérer les conversations actives
  static async getConversations(): Promise<Conversation[]> {
    try {
      const stored = await storage.getItem(CONVERSATIONS_KEY);
      if (!stored) return [];

      const conversations = JSON.parse(stored);
      return conversations.map((conv: any) => ({
        ...conv,
        lastMessageTime: conv.lastMessageTime ? new Date(conv.lastMessageTime) : undefined,
      }));
    } catch (error) {
      console.error('Error loading conversations:', error);
      return [];
    }
  }

  // Sauvegarder les conversations
  static async saveConversations(conversations: Conversation[]): Promise<void> {
    try {
      const conversationsToStore = conversations.map(conv => ({
        ...conv,
        lastMessageTime: conv.lastMessageTime?.toISOString(),
      }));
      await storage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversationsToStore));
    } catch (error) {
      console.error('Error saving conversations:', error);
      throw error;
    }
  }

  // Mettre à jour le dernier message d'un contact
  static async updateContactLastMessage(
    contactId: string,
    message: string,
    timestamp: Date
  ): Promise<void> {
    try {
      const conversations = await this.getConversations();
      const existingIndex = conversations.findIndex(conv => conv.contactId === contactId);

      if (existingIndex >= 0) {
        conversations[existingIndex] = {
          ...conversations[existingIndex],
          lastMessage: message,
          lastMessageTime: timestamp,
          unreadCount: (conversations[existingIndex].unreadCount || 0) + 1,
        };
      } else {
        conversations.push({
          contactId,
          lastMessage: message,
          lastMessageTime: timestamp,
          unreadCount: 1,
        });
      }

      await this.saveConversations(conversations);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }

  // Marquer un contact comme lu
  static async markContactAsRead(contactId: string): Promise<void> {
    try {
      const conversations = await this.getConversations();
      const updatedConversations = conversations.map(conv =>
        conv.contactId === contactId
          ? { ...conv, unreadCount: 0 }
          : conv
      );
      await this.saveConversations(updatedConversations);
    } catch (error) {
      console.error('Error marking contact as read:', error);
    }
  }

  // Rechercher des contacts
  static async searchContacts(query: string): Promise<Contact[]> {
    try {
      const allContacts = await this.getContacts();
      if (!query.trim()) return allContacts;

      return allContacts.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        (contact.phoneNumber && contact.phoneNumber.includes(query))
      );
    } catch (error) {
      console.error('Error searching contacts:', error);
      return [];
    }
  }
}