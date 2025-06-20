import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  Info, 
  Paperclip, 
  Camera, 
  Mic,
  Smile
} from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MessageService, Message } from '@/services/MessageService';

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    // Simulate typing response
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isOwn) {
        setIsTyping(true);
        const timeout = setTimeout(() => {
          simulateResponse();
          setIsTyping(false);
        }, 2000 + Math.random() * 2000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [messages]);

  const loadMessages = async () => {
    try {
      const loadedMessages = await MessageService.getMessages();
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const simulateResponse = async () => {
    const responses = [
      'Salut ! 😊',
      'Comment ça va ?',
      'Oui, je suis là !',
      'Merci pour ton message',
      'À bientôt !',
      'Super ! 👍',
      'D\'accord avec toi',
      'Pas de problème',
      'On se parle plus tard ?',
      'Bonne journée !',
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const responseMessage: Message = {
      id: Date.now().toString(),
      text: randomResponse,
      timestamp: new Date(),
      isOwn: false,
    };

    try {
      await MessageService.saveMessage(responseMessage);
      setMessages(prev => [...prev, responseMessage]);
      
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      timestamp: new Date(),
      isOwn: true,
    };

    try {
      await MessageService.saveMessage(newMessage);
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleCall = () => {
    Alert.alert('Appel', `Appeler ${name} ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Appeler', onPress: () => console.log('Calling...') }
    ]);
  };

  const handleVideoCall = () => {
    Alert.alert('Appel vidéo', `Appel vidéo avec ${name} ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Appeler', onPress: () => console.log('Video calling...') }
    ]);
  };

  const handleInfo = () => {
    router.push({
      pathname: '/contact-profile',
      params: { contactId: id }
    });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isOwn ? styles.ownMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.isOwn ? styles.ownBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isOwn ? styles.ownMessageText : styles.otherMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime,
          item.isOwn ? styles.ownMessageTime : styles.otherMessageTime
        ]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    
    return (
      <View style={[styles.messageContainer, styles.otherMessage]}>
        <View style={[styles.messageBubble, styles.otherBubble, styles.typingBubble]}>
          <View style={styles.typingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactInfo} onPress={handleInfo}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }}
            style={styles.contactAvatar}
          />
          <View style={styles.contactDetails}>
            <Text style={styles.contactName}>{name}</Text>
            {isTyping ? (
              <Text style={styles.typingIndicator}>en train d'écrire...</Text>
            ) : (
              <Text style={styles.onlineStatus}>en ligne</Text>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleVideoCall}>
            <Video size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Phone size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleInfo}>
            <Info size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={renderTypingIndicator}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={24} color="#888" />
          </TouchableOpacity>
          
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message"
              placeholderTextColor="#666"
              multiline
              maxLength={500}
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Smile size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {inputText.trim() ? (
            <TouchableOpacity 
              onPress={sendMessage}
              style={styles.sendButton}
            >
              <Send size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.voiceButtons}>
              <TouchableOpacity style={styles.voiceButton}>
                <Camera size={24} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.voiceButton}>
                <Mic size={24} color="#888" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  onlineStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  typingIndicator: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
    fontStyle: 'italic',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    marginVertical: 2,
    maxWidth: '80%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '100%',
    position: 'relative',
  },
  ownBubble: {
    backgroundColor: '#4CAF50',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#2a2a2a',
    borderBottomLeftRadius: 4,
  },
  typingBubble: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  ownMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherMessageTime: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  inputContainer: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 4,
  },
  emojiButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtons: {
    flexDirection: 'row',
  },
  voiceButton: {
    padding: 8,
    marginLeft: 4,
  },
});