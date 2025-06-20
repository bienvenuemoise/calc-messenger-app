import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { Phone, Video, PhoneCall, PhoneMissed, PhoneIncoming, PhoneOutgoing } from 'lucide-react-native';

interface CallRecord {
  id: string;
  contactName: string;
  contactAvatar?: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'voice' | 'video';
  timestamp: Date;
  duration?: string;
}

export default function CallsTab() {
  const [calls, setCalls] = useState<CallRecord[]>([]);

  useEffect(() => {
    loadCalls();
  }, []);

  const loadCalls = () => {
    // Mock call data
    const mockCalls: CallRecord[] = [
      {
        id: '1',
        contactName: 'Sarah Martin',
        contactAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        type: 'outgoing',
        callType: 'voice',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        duration: '12:34',
      },
      {
        id: '2',
        contactName: 'Thomas Dubois',
        contactAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        type: 'missed',
        callType: 'video',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: '3',
        contactName: 'Emma Leroy',
        contactAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        type: 'incoming',
        callType: 'voice',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        duration: '5:23',
      },
      {
        id: '4',
        contactName: 'Lucas Bernard',
        type: 'outgoing',
        callType: 'video',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        duration: '45:12',
      },
    ];
    setCalls(mockCalls);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}m`;
    }
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}j`;
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  const getCallIcon = (type: string, callType: string) => {
    const iconColor = type === 'missed' ? '#F44336' : '#4CAF50';
    const iconSize = 16;

    if (type === 'missed') {
      return <PhoneMissed size={iconSize} color={iconColor} />;
    }
    if (type === 'incoming') {
      return <PhoneIncoming size={iconSize} color={iconColor} />;
    }
    if (type === 'outgoing') {
      return <PhoneOutgoing size={iconSize} color={iconColor} />;
    }
    return <Phone size={iconSize} color={iconColor} />;
  };

  const renderCall = ({ item }: { item: CallRecord }) => (
    <TouchableOpacity style={styles.callItem} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        {item.contactAvatar ? (
          <Image source={{ uri: item.contactAvatar }} style={styles.avatar} />
        ) : (
          <View style={styles.defaultAvatar}>
            <Text style={styles.avatarText}>
              {item.contactName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.callInfo}>
        <Text style={[
          styles.contactName,
          item.type === 'missed' && styles.missedCall
        ]} numberOfLines={1}>
          {item.contactName}
        </Text>
        
        <View style={styles.callDetails}>
          {getCallIcon(item.type, item.callType)}
          <Text style={styles.callTime}>
            {formatTime(item.timestamp)}
            {item.duration && ` • ${item.duration}`}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.callButton}>
        {item.callType === 'video' ? (
          <Video size={24} color="#4CAF50" />
        ) : (
          <Phone size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Appels</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <PhoneCall size={48} color="#666" />
      <Text style={styles.emptyStateTitle}>Aucun appel récent</Text>
      <Text style={styles.emptyStateSubtitle}>
        Vos appels récents apparaîtront ici
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <FlatList
        data={calls}
        keyExtractor={(item) => item.id}
        renderItem={renderCall}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContent: {
    flexGrow: 1,
  },
  headerContainer: {
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
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
  },
  avatarContainer: {
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
  callInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  missedCall: {
    color: '#F44336',
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callTime: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
  },
  callButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
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