# 🧮 CalC - Calculator Messenger App

<div align="center">
  <img src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" alt="Calculator App" width="200" style="border-radius: 20px; margin: 20px 0;">
  
  **A sophisticated calculator app with a hidden WhatsApp-inspired messaging interface**
  
  *Perfect for secure, private communications disguised as a simple calculator*

  [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template)
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-app-url.railway.app)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## 🎯 Features

### 🧮 **Calculator Mode**
- **Professional Calculator**: Fully functional calculator with gradient buttons
- **Secret Code Access**: Enter `12345=` to unlock messaging mode
- **Haptic Feedback**: Tactile response on button presses (mobile only)
- **Clean Design**: Modern, iOS-inspired interface with smooth animations

### 💬 **Hidden Messaging Mode**
- **WhatsApp-Inspired Interface**: Complete messaging experience
- **Four Main Tabs**:
  - 📱 **Discussions**: Real-time chat with contacts
  - 📞 **Appels**: Voice and video call history
  - 👥 **Statuts**: Status updates and stories
  - ⚙️ **Paramètres**: Comprehensive settings and profile management

### 🔐 **Security Features**
- **Message Encryption**: All messages encrypted before storage
- **Local Storage Only**: No external data transmission
- **Quick Exit**: Instant return to calculator mode
- **Zero Traces**: Appears as a normal calculator app
- **Auto-Lock**: Automatic return to calculator after inactivity

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Expo CLI (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/calc-messenger-app.git
cd calc-messenger-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🌐 Access the App
1. Open your browser to the provided localhost URL
2. Use the calculator normally
3. **Secret Code**: Type `12345=` to access messaging mode

---

## 📱 Usage Guide

### 🔓 **Accessing Messaging Mode**
1. Open the calculator interface
2. Enter the sequence: `1` → `2` → `3` → `4` → `5` → `=`
3. App automatically switches to messaging interface

### 💬 **Messaging Features**
- **Send/Receive Messages**: Full chat functionality with encryption
- **Contact Management**: Add and organize contacts
- **Profile Customization**: Update name, status, and avatar
- **Status Stories**: Share and view temporary status updates
- **Call History**: Track voice and video communications
- **Privacy Settings**: Control visibility and security options

### 🔒 **Security Settings**
- **Change Secret Code**: Customize your access code
- **Auto-Lock Timer**: Set inactivity timeout
- **Message Encryption**: Toggle encryption levels
- **Emergency Exit**: Quick return to calculator mode

---

## 🛠 Technical Stack

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| **Expo** | React Native Framework | 53.0.0 |
| **React Native** | Mobile Development | 0.79.1 |
| **Expo Router** | Navigation | 5.0.2 |
| **TypeScript** | Type Safety | 5.8.3 |
| **AsyncStorage** | Local Data Storage | 2.1.0 |
| **Lucide Icons** | Icon Library | 0.475.0 |
| **Expo Crypto** | Encryption | 14.1.3 |

</div>

---

## 🎨 Design Philosophy

### **Visual Design**
- **Minimalist Interface**: Clean, distraction-free calculator
- **WhatsApp Inspiration**: Familiar messaging patterns and colors
- **Dark Theme**: Modern, eye-friendly interface
- **Smooth Animations**: Polished transitions and micro-interactions

### **User Experience**
- **Intuitive Navigation**: Natural flow between modes
- **Responsive Design**: Works perfectly on all screen sizes
- **Accessibility**: Screen reader compatible
- **Performance**: Optimized for smooth operation

---

## 🚀 Deployment

### **Railway Deployment** (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### **Manual Deployment**
```bash
# Build for production
npm run build:web

# Deploy to your preferred hosting service
npm run start:web
```

### **Docker Deployment**
```bash
# Build Docker image
docker build -t calc-messenger .

# Run container
docker run -p 3000:3000 calc-messenger
```

---

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory:

```env
# App Configuration
EXPO_PUBLIC_APP_NAME=CalC
EXPO_PUBLIC_SECRET_CODE=12345
EXPO_PUBLIC_AUTO_LOCK_TIME=300000

# Security Settings
EXPO_PUBLIC_ENCRYPTION_ENABLED=true
EXPO_PUBLIC_DEBUG_MODE=false
```

### **Customization Options**
- **Secret Code**: Change in settings or environment variables
- **Theme Colors**: Modify in `styles/colors.ts`
- **Auto-Lock Timer**: Configurable timeout duration
- **Encryption Level**: Toggle encryption strength

---

## 📊 Project Structure

```
calc-messenger-app/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   │   ├── chats/         # Chat interface
│   │   ├── calls/         # Call history
│   │   ├── status/        # Status updates
│   │   └── settings/      # App settings
│   ├── chat/[id].tsx      # Individual chat screen
│   ├── profile.tsx        # User profile
│   └── index.tsx          # Calculator interface
├── components/            # Reusable components
├── services/              # Data services
│   ├── ContactService.ts  # Contact management
│   ├── MessageService.ts  # Message handling
│   └── SettingsService.ts # App settings
├── utils/                 # Utility functions
│   ├── crypto.ts          # Encryption utilities
│   └── haptics.ts         # Haptic feedback
└── hooks/                 # Custom React hooks
```

---

## 🔒 Privacy & Security

### **Data Protection**
- ✅ **Local Storage Only**: No cloud synchronization
- ✅ **Message Encryption**: AES-256 encryption for all messages
- ✅ **No Tracking**: Zero analytics or user tracking
- ✅ **Open Source**: Fully auditable codebase
- ✅ **Secure Access**: Hidden behind calculator interface

### **Security Best Practices**
- Regular security audits
- Encrypted local storage
- No external API calls for sensitive data
- Secure key management
- Auto-lock functionality

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add tests for new features
- Update documentation as needed
- Ensure mobile responsiveness

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This application is designed for **educational and privacy purposes**. Users are responsible for complying with local laws and regulations regarding encrypted communications. The developers are not responsible for any misuse of this software.

---

## 🆘 Support

### **Getting Help**
- 📖 **Documentation**: Check our comprehensive guides
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Submit enhancement proposals
- 💬 **Community**: Join our discussions

### **Contact**
- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/calc-messenger-app/issues)
- **Email**: support@your-domain.com
- **Discord**: Join our community server

---

## 🌟 Acknowledgments

- **Expo Team**: For the amazing React Native framework
- **WhatsApp**: For design inspiration
- **Pexels**: For beautiful stock photography
- **Open Source Community**: For continuous support and contributions

---

<div align="center">
  <h3>🔐 Made with ❤️ for privacy-conscious users</h3>
  
  **Star ⭐ this repository if you find it useful!**
  
  [![GitHub stars](https://img.shields.io/github/stars/yourusername/calc-messenger-app?style=social)](https://github.com/yourusername/calc-messenger-app/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/yourusername/calc-messenger-app?style=social)](https://github.com/yourusername/calc-messenger-app/network/members)
</div>