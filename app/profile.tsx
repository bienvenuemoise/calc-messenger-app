import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { ArrowLeft, Camera, CreditCard as Edit3, Check, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { UserProfileService } from '@/services/UserProfileService';

interface UserProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  avatar?: string;
  status: string;
  statusType: 'available' | 'busy' | 'away' | 'custom';
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempStatus, setTempStatus] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userProfile = await UserProfileService.getUserProfile();
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleAvatarPress = () => {
    Alert.alert(
      'Photo de profil',
      'Choisir une nouvelle photo de profil',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Galerie', onPress: () => console.log('Open gallery') },
        { text: 'Appareil photo', onPress: () => console.log('Open camera') }
      ]
    );
  };

  const handleEditName = () => {
    if (profile) {
      setTempName(profile.name);
      setEditingName(true);
    }
  };

  const saveName = async () => {
    if (tempName.trim() && profile) {
      try {
        const updatedProfile = await UserProfileService.updateUserProfile({
          name: tempName.trim()
        });
        setProfile(updatedProfile);
        setEditingName(false);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de mettre à jour le nom');
      }
    }
  };

  const cancelEditName = () => {
    setEditingName(false);
    setTempName('');
  };

  const handleEditStatus = () => {
    if (profile) {
      setTempStatus(profile.status);
      setEditingStatus(true);
    }
  };

  const saveStatus = async () => {
    if (tempStatus.trim() && profile) {
      try {
        const updatedProfile = await UserProfileService.updateUserProfile({
          status: tempStatus.trim(),
          statusType: 'custom'
        });
        setProfile(updatedProfile);
        setEditingStatus(false);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de mettre à jour le statut');
      }
    }
  };

  const cancelEditStatus = () => {
    setEditingStatus(false);
    setTempStatus('');
  };

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <Text style={styles.loadingText}>Chargement...</Text>
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
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo de profil */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarContainer}>
            {profile.avatar ? (
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.defaultAvatar}>
                <Text style={styles.avatarText}>
                  {profile.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.cameraOverlay}>
              <Camera size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Nom */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionLabel}>Nom</Text>
          <View style={styles.infoItem}>
            {editingName ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Nom"
                  placeholderTextColor="#666"
                  autoFocus
                />
                <View style={styles.editActions}>
                  <TouchableOpacity onPress={cancelEditName} style={styles.editButton}>
                    <X size={20} color="#888" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={saveName} style={styles.editButton}>
                    <Check size={20} color="#4CAF50" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity onPress={handleEditName} style={styles.infoRow}>
                <Text style={styles.infoText}>{profile.name}</Text>
                <Edit3 size={16} color="#888" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.infoDescription}>
            Ce nom sera visible par vos contacts WhatsApp.
          </Text>
        </View>

        {/* Numéro de téléphone */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionLabel}>Numéro de téléphone</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>{profile.phoneNumber || 'Non défini'}</Text>
          </View>
        </View>

        {/* Statut */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionLabel}>Statut</Text>
          <View style={styles.infoItem}>
            {editingStatus ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={tempStatus}
                  onChangeText={setTempStatus}
                  placeholder="Statut"
                  placeholderTextColor="#666"
                  autoFocus
                  multiline
                />
                <View style={styles.editActions}>
                  <TouchableOpacity onPress={cancelEditStatus} style={styles.editButton}>
                    <X size={20} color="#888" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={saveStatus} style={styles.editButton}>
                    <Check size={20} color="#4CAF50" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity onPress={handleEditStatus} style={styles.infoRow}>
                <Text style={styles.infoText}>{profile.status}</Text>
                <Edit3 size={16} color="#888" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.infoDescription}>
            Votre statut sera visible par vos contacts.
          </Text>
        </View>

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#888',
    fontSize: 16,
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#1a1a1a',
  },
  avatarContainer: {
    position: 'relative',
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
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1a1a1a',
  },
  infoSection: {
    backgroundColor: '#1a1a1a',
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 8,
    fontWeight: '500',
  },
  infoItem: {
    paddingVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  infoDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    lineHeight: 16,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  editActions: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 8,
    marginLeft: 4,
  },
  bottomSpacing: {
    height: 40,
  },
});