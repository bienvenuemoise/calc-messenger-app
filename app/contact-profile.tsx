import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Shield, 
  Trash2, 
  User,
  Clock
} from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { playHaptic } from '@/utils/haptics';
import { ContactService } from '@/services/ContactService';
import { MessageService } from '@/services/MessageService';
import { Contact } from '@/components/ContactList';

export default function ContactProfile() {
  const { contactId } = useLocalSearchParams<{ contactId: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContactDetails();
  }, [contactId]);

  const loadContactDetails = async () => {
    try {
      const contacts = await ContactService.getContacts();
      const foundContact = contacts.find(c => c.id === contactId);
      setContact(foundContact || null);
    } catch (error) {
      console.error('Error loading contact details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    playHaptic();
    if (contact?.phoneNumber) {
      Alert.alert(
        'Appeler',
        `Appeler ${contact.name} au ${contact.phoneNumber} ?`,
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Appeler', onPress: () => console.log('Calling...') }
        ]
      );
    }
  };

  const handleMessage = () => {
    playHaptic();
    router.back();
  };

  const handleBlockContact = () => {
    playHaptic();
    Alert.alert(
      'Bloquer le contact',
      `Êtes-vous sûr de vouloir bloquer ${contact?.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Bloquer',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Contact bloqué', `${contact?.name} a été bloqué`);
          }
        }
      ]
    );
  };

  const handleDeleteConversation = () => {
    playHaptic();
    Alert.alert(
      'Supprimer la conversation',
      `Supprimer toute la conversation avec ${contact?.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              // Ici vous pourriez implémenter la suppression spécifique à ce contact
              Alert.alert('Conversation supprimée', 'La conversation a été supprimée');
              router.back();
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de supprimer la conversation');
            }
          }
        }
      ]
    );
  };

  const handleBack = () => {
    playHaptic();
    router.back();
  };

  const formatLastSeen = () => {
    if (contact?.isOnline) {
      return 'En ligne';
    }
    
    if (contact?.lastMessageTime) {
      const now = new Date();
      const lastSeen = contact.lastMessageTime;
      const diffInHours = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        return 'Vu récemment';
      } else if (diffInHours < 24) {
        return `Vu il y a ${diffInHours}h`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `Vu il y a ${diffInDays}j`;
      }
    }
    
    return 'Vu récemment';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </View>
    );
  }

  if (!contact) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Contact introuvable</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo de profil et informations principales */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {contact.avatar ? (
              <Image source={{ uri: contact.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.defaultAvatar}>
                <User size={60} color="#666" />
              </View>
            )}
          </View>
          
          <Text style={styles.contactName}>{contact.name}</Text>
          
          {contact.phoneNumber && (
            <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
          )}
          
          <View style={styles.statusContainer}>
            <Clock size={14} color="#888" />
            <Text style={styles.lastSeen}>{formatLastSeen()}</Text>
          </View>
        </View>

        {/* Boutons d'action principaux */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <View style={styles.actionButtonIcon}>
              <Phone size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionButtonText}>Appeler</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
            <View style={styles.actionButtonIcon}>
              <MessageCircle size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* Informations supplémentaires */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Numéro de téléphone</Text>
            <Text style={styles.infoValue}>
              {contact.phoneNumber || 'Non disponible'}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Statut</Text>
            <Text style={styles.infoValue}>
              {contact.isOnline ? 'En ligne' : 'Hors ligne'}
            </Text>
          </View>
        </View>

        {/* Actions de gestion */}
        <View style={styles.managementSection}>
          <TouchableOpacity 
            style={styles.managementButton} 
            onPress={handleBlockContact}
          >
            <Shield size={20} color="#FF5722" />
            <Text style={styles.managementButtonText}>Bloquer ce contact</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.managementButton} 
            onPress={handleDeleteConversation}
          >
            <Trash2 size={20} color="#F44336" />
            <Text style={[styles.managementButtonText, styles.deleteText]}>
              Supprimer la conversation
            </Text>
          </TouchableOpacity>
        </View>

        {/* Espace en bas pour le scroll */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#888',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#888',
    fontSize: 16,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  defaultAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#888',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  lastSeen: {
    fontSize: 14,
    color: '#888',
    marginLeft: 6,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: '#000',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionButtonIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: '#1a1a1a',
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
  },
  managementSection: {
    backgroundColor: '#1a1a1a',
    marginTop: 20,
    paddingVertical: 10,
  },
  managementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  managementButtonText: {
    fontSize: 16,
    color: '#FF5722',
    marginLeft: 16,
    fontWeight: '500',
  },
  deleteText: {
    color: '#F44336',
  },
  bottomSpacing: {
    height: 40,
  },
});