import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Switch,
} from 'react-native';
import { User, Key, Bell, Shield, Palette, CircleHelp as HelpCircle, Info, ChevronRight, Star, Heart, Users, Archive, Moon } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const settingsGroups = [
    {
      title: 'Compte',
      items: [
        {
          icon: <User size={24} color="#4CAF50" />,
          title: 'Profil',
          subtitle: 'Nom, photo, numéro de téléphone',
          onPress: () => router.push('/profile'),
        },
        {
          icon: <Key size={24} color="#4CAF50" />,
          title: 'Compte',
          subtitle: 'Sécurité, changer de numéro, supprimer le compte',
          onPress: () => {},
        },
        {
          icon: <Users size={24} color="#4CAF50" />,
          title: 'Avatar et nom',
          subtitle: 'Créer, modifier, profil photo',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Paramètres',
      items: [
        {
          icon: <Bell size={24} color="#4CAF50" />,
          title: 'Notifications',
          subtitle: 'Messages, groupes et sons d\'appel',
          onPress: () => {},
          rightComponent: (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#333', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          ),
        },
        {
          icon: <Shield size={24} color="#4CAF50" />,
          title: 'Confidentialité',
          subtitle: 'Blocage, statut en ligne, lecture',
          onPress: () => {},
        },
        {
          icon: <Archive size={24} color="#4CAF50" />,
          title: 'Stockage et données',
          subtitle: 'Utilisation du réseau et stockage',
          onPress: () => {},
        },
        {
          icon: <Palette size={24} color="#4CAF50" />,
          title: 'Thèmes',
          subtitle: 'Fond d\'écran, thème sombre',
          onPress: () => {},
          rightComponent: (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#333', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          ),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle size={24} color="#4CAF50" />,
          title: 'Aide',
          subtitle: 'FAQ, nous contacter, politique de confidentialité',
          onPress: () => {},
        },
        {
          icon: <Heart size={24} color="#4CAF50" />,
          title: 'Inviter des amis',
          subtitle: 'Partager WhatsApp avec vos amis',
          onPress: () => {},
        },
        {
          icon: <Star size={24} color="#4CAF50" />,
          title: 'Évaluer l\'application',
          subtitle: 'Donnez votre avis sur l\'App Store',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'À propos',
      items: [
        {
          icon: <Info size={24} color="#4CAF50" />,
          title: 'À propos',
          subtitle: 'Version, conditions d\'utilisation',
          onPress: () => {},
        },
      ],
    },
  ];

  const renderProfileHeader = () => (
    <TouchableOpacity style={styles.profileHeader} onPress={() => router.push('/profile')}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }}
        style={styles.profileAvatar}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Mon Profil</Text>
        <Text style={styles.profileStatus}>Disponible</Text>
      </View>
      <ChevronRight size={24} color="#888" />
    </TouchableOpacity>
  );

  const renderSettingsGroup = (group: typeof settingsGroups[0], index: number) => (
    <View key={index} style={styles.settingsGroup}>
      <Text style={styles.groupTitle}>{group.title}</Text>
      {group.items.map((item, itemIndex) => (
        <TouchableOpacity
          key={itemIndex}
          style={styles.settingsItem}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.settingsItemLeft}>
            {item.icon}
            <View style={styles.settingsItemText}>
              <Text style={styles.settingsItemTitle}>{item.title}</Text>
              <Text style={styles.settingsItemSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
          {item.rightComponent || <ChevronRight size={20} color="#888" />}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        
        {settingsGroups.map((group, index) => renderSettingsGroup(group, index))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>WhatsApp pour Web</Text>
          <Text style={styles.footerVersion}>Version 2.24.1.78</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 14,
    color: '#888',
  },
  settingsGroup: {
    marginTop: 20,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0a0a0a',
    textTransform: 'uppercase',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemText: {
    marginLeft: 16,
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: '#666',
  },
});