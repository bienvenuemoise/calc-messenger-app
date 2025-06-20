# Changelog

All notable changes to CalC - Calculator Messenger App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial repository setup
- GitHub deployment configuration
- Comprehensive documentation

## [1.0.0] - 2024-01-XX

### Added
- 🧮 **Calculator Interface**
  - Professional calculator with gradient buttons
  - iOS-inspired design with smooth animations
  - Haptic feedback for mobile devices
  - Secret code access system (`12345=`)

- 💬 **Hidden Messaging System**
  - WhatsApp-inspired interface design
  - Four main tabs: Discussions, Appels, Statuts, Paramètres
  - Real-time messaging with typing indicators
  - Contact management and integration
  - Profile customization system

- 🔐 **Security Features**
  - Message encryption using AES-256
  - Local storage only (no cloud sync)
  - Auto-lock functionality
  - Quick exit to calculator mode
  - Zero external data transmission

- 📱 **Chat Features**
  - Individual and group conversations
  - Message encryption and decryption
  - Contact avatar and status management
  - Unread message counters
  - Message timestamps and delivery status

- 📞 **Call Management**
  - Voice and video call history
  - Call duration tracking
  - Missed call indicators
  - Contact integration for calls

- 👥 **Status Updates**
  - WhatsApp-style status stories
  - View and post status updates
  - Status expiration management
  - Privacy controls for status visibility

- ⚙️ **Settings & Configuration**
  - User profile management
  - Avatar and name customization
  - Status message configuration
  - Privacy and security settings
  - Notification preferences
  - Theme customization
  - Secret code management

- 🛠 **Technical Implementation**
  - Expo Router for navigation
  - TypeScript for type safety
  - AsyncStorage for local data persistence
  - Platform-specific code handling
  - Responsive design for all screen sizes

- 🚀 **Deployment & Infrastructure**
  - Railway deployment configuration
  - Docker containerization
  - Environment variable management
  - Production build optimization

### Security
- Implemented end-to-end message encryption
- Local-only data storage with no external APIs
- Secure secret code access system
- Auto-lock timer for enhanced security
- No user tracking or analytics

### Performance
- Optimized bundle size for web deployment
- Efficient local storage management
- Smooth animations and transitions
- Responsive design for all devices

### Documentation
- Comprehensive README with setup instructions
- Contributing guidelines and code of conduct
- API documentation for services
- Security best practices guide

## [0.1.0] - 2024-01-XX

### Added
- Initial project setup with Expo
- Basic calculator functionality
- Project structure and configuration
- Development environment setup

---

## Release Notes

### Version 1.0.0 - "Secret Calculator"

This is the initial release of CalC, featuring a fully functional calculator that secretly contains a complete WhatsApp-inspired messaging system. The app provides secure, private communication disguised as a simple calculator application.

**Key Highlights:**
- 🔐 **Complete Privacy**: All data stored locally with encryption
- 💬 **Full Messaging Suite**: Chat, calls, status, and settings
- 🧮 **Professional Calculator**: Fully functional with beautiful design
- 🚀 **Production Ready**: Optimized for deployment and real-world use

**Security Notice:**
This application prioritizes user privacy and security. All messages are encrypted before storage, and no data is transmitted to external servers. The app appears as a normal calculator to maintain user privacy.

**Compatibility:**
- ✅ Web browsers (Chrome, Firefox, Safari, Edge)
- ✅ iOS devices (via Expo Go or standalone build)
- ✅ Android devices (via Expo Go or standalone build)
- ✅ Desktop browsers with responsive design

**Getting Started:**
1. Open the calculator interface
2. Enter the secret code: `12345=`
3. Access the full messaging system
4. Customize your profile and start chatting securely

For detailed setup instructions, see the [README.md](README.md) file.

---

**Contributors:**
- Development Team
- Security Auditors
- Beta Testers
- Community Contributors

**Special Thanks:**
- Expo team for the amazing framework
- WhatsApp for design inspiration
- Open source community for continuous support