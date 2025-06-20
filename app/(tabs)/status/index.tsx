import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Plus, Eye, Camera } from 'lucide-react-native';

interface StatusUpdate {
  id: string;
  contactName: string;
  contactAvatar?: string;
  timestamp: Date;
  viewed: boolean;
  isOwn?: boolean;
}

export default function StatusTab() {
  const [myStatus, setMyStatus] = useState<StatusUpdate[]>([]);
  const [recentUpdates, setRecentUpdates] = useState<StatusUpdate[]>([]);
  const [viewedUpdates, setViewedUpdates] = useState<StatusUpdate[]>([]);

  useEffect(() => {
    loadStatusUpdates();
  }, []);

  const loadStatusUpdates = () => {
    // Mock status data
    const mockRecentUpdates: StatusUpdate[] = [
      {
        id: '1',
        contactName: 'Sarah Martin',
        contactAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        viewed: false,
      },
      {
        id: '2',
        contactName: 'Thomas Dubois',
        contactAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        viewed: false,
      },
      {
        id: '3',
        contactName: 'Emma Leroy',
        contactAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        viewed: false,
      },
    ];

    const mockViewedUpdates: StatusUpdate[] = [
      {
        id: '4',
        contactName: 'Lucas Bernard',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        viewed: true,
      },
      {
        id: '5',
        contactName: 'Julie Moreau',
        contactAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18 hours ago
        viewed: true,
      },
    ];

    setRecentUpdates(mockRecentUpdates);
    setViewedUpdates(mockViewedUpdates);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) {
      const minutes = Math.floor(diff / 60000);
      return `il y a ${minutes}m`;
    }
    if (hours < 24) return `il y a ${hours}h`;
    return `il y a ${days}j`;
  };

  const handleStatusPress = (status: StatusUpdate) => {
    // Mark as viewed and move to viewed list
    if (!status.viewed) {
      const updatedStatus = { ...status, viewed: true };
      setRecentUpdates(prev => prev.filter(s => s.id !== status.id));
      setViewedUpdates(prev => [updatedStatus, ...prev]);
    }
  };

  const renderMyStatus = () => (
    <TouchableOpacity style={styles.myStatusContainer} activeOpacity={0.7}>
      <View style={styles.myStatusAvatar}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }} 
          style={styles.avatar} 
        />
        <View style={styles.addStatusButton}>
          <Plus size={16} color="#fff" />
        </View>
      </View>
      <View style={styles.myStatusInfo}>
        <Text style={styles.myStatusTitle}>Mon statut</Text>
        <Text style={styles.myStatusSubtitle}>Appuyez pour ajouter une mise à jour de statut</Text>
      </View>
      <TouchableOpacity style={styles.cameraButton}>
        <Camera size={24} color="#4CAF50" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderStatusUpdate = ({ item }: { item: StatusUpdate }) => (
    <TouchableOpacity 
      style={styles.statusItem} 
      onPress={() => handleStatusPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.statusAvatarContainer}>
        {item.contactAvatar ? (
          <Image source={{ uri: item.contactAvatar }} style={styles.avatar} />
        ) : (
          <View style={styles.defaultAvatar}>
            <Text style={styles.avatarText}>
              {item.contactName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={[
          styles.statusRing,
          item.viewed ? styles.viewedRing : styles.unviewedRing
        ]} />
      </View>

      <View style={styles.statusInfo}>
        <Text style={styles.contactName} numberOfLines={1}>
          {item.contactName}
        </Text>
        <Text style={styles.statusTime}>
          {formatTime(item.timestamp)}
        </Text>
      </View>

      {!item.viewed && (
        <View style={styles.unreadIndicator} />
      )}
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statuts</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderMyStatus()}

        {recentUpdates.length > 0 && (
          <>
            {renderSectionHeader('Mises à jour récentes')}
            <FlatList
              data={recentUpdates}
              keyExtractor={(item) => item.id}
              renderItem={renderStatusUpdate}
              scrollEnabled={false}
            />
          </>
        )}

        {viewedUpdates.length > 0 && (
          <>
            {renderSectionHeader('Vues')}
            <FlatList
              data={viewedUpdates}
              keyExtractor={(item) => item.id}
              renderItem={renderStatusUpdate}
              scrollEnabled={false}
            />
          </>
        )}

        {recentUpdates.length === 0 && viewedUpdates.length === 0 && (
          <View style={styles.emptyState}>
            <Eye size={48} color="#666" />
            <Text style={styles.emptyStateTitle}>Aucune mise à jour récente</Text>
            <Text style={styles.emptyStateSubtitle}>
              Les mises à jour de statut de vos contacts apparaîtront ici
            </Text>
          </View>
        )}
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
  myStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  myStatusAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  addStatusButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  myStatusInfo: {
    flex: 1,
  },
  myStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  myStatusSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  cameraButton: {
    padding: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0a0a0a',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
  },
  statusAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  statusRing: {
    position: 'absolute',
    top: -3,
    left: -3,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
  },
  unviewedRing: {
    borderColor: '#4CAF50',
  },
  viewedRing: {
    borderColor: '#666',
  },
  statusInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  statusTime: {
    fontSize: 14,
    color: '#888',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
    marginTop: 100,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});