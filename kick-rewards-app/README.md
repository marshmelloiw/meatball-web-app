# Köfte/Meatball - Kick Moderation & Rewards Extension

**Köfte** (Turkish) / **Meatball** (English) - Advanced moderation panel and reward system browser extension for Kick streamers and moderators.

## 🌟 Features

### 🛡️ Advanced Moderation Panel
- **Twitch-like Interface**: Familiar and intuitive moderation tools
- **Real-time Chat Management**: Delete, highlight, and moderate messages instantly
- **User Management**: Ban, timeout, VIP, and mod users with one click
- **Smart Filtering**: Filter messages by mods, VIPs, deleted messages, and more
- **Live Statistics**: Real-time chat and user analytics
- **Quick Actions**: Emergency stop, slow mode, subscriber-only mode

### 💎 Rewards System
- **Point Earning**: Automatic points for watching streams
- **Interactive Shop**: Purchase special features and rewards with points
- **Achievement System**: Unlock badges and bonuses through activities
- **Level Progression**: Advance through levels and unlock new features
- **Multipliers**: Boost point earning with premium features

### 🎨 Modern Design
- **Purple/Blue Theme**: Beautiful gradient design with modern colors
- **Responsive**: Works perfectly on all screen sizes
- **Smooth Animations**: Polished user experience with smooth transitions
- **Dark Theme**: Easy on the eyes for long moderation sessions
- **Turkish/English**: Full localization support

## 🚀 Installation

### Chrome/Edge Extension
1. Download the latest release from [Releases](https://github.com/meatball-team/meatball-extension/releases)
2. Extract the ZIP file
3. Open Chrome/Edge and go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked" and select the extracted folder
6. The Köfte extension icon will appear in your toolbar

### Development Setup
```bash
# Clone the repository
git clone https://github.com/meatball-team/meatball-extension.git
cd meatball-extension

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📱 Usage

### Extension Popup
Click the Köfte extension icon to open the popup interface:
- **Dashboard**: Overview of points, level, and quick actions
- **Shop**: Browse and purchase features with points
- **Profile**: View achievements and account settings

### Moderation Panel
1. Navigate to any Kick.com stream
2. Click the shield icon in the extension popup
3. The moderation panel will slide in from the right
4. Manage chat, users, and view statistics

### Point System
- **Automatic Earning**: Points earned while watching streams
- **Bonus Events**: Random bonus points during streaming
- **Shop Purchases**: Spend points on VIP badges, multipliers, and more
- **Achievements**: Complete goals to earn extra points

## 🛠️ Features Overview

### Moderation Panel Tabs
- **🗨️ Chat**: Real-time message management with filtering
- **👥 Users**: User list with moderation actions
- **📊 Stats**: Live statistics and analytics
- **⚙️ Settings**: Moderation preferences and quick actions

### Shop Categories
- **👑 Cosmetics**: VIP badges, special colors, custom emojis
- **⚡ Boosts**: Point multipliers, bonus generators
- **🔧 Features**: Advanced moderation tools, ad-free experience
- **🎁 Rewards**: Steam gifts, PlayStation Store credits

### User Roles & Badges
- **🛡️ Moderator**: Full moderation privileges
- **⭐ VIP**: Special privileges and badge
- **👑 Subscriber**: Subscription badge and perks
- **🤖 Bot**: Automated account indicator

## 🎯 Technical Details

### Built With
- **React 18**: Modern React with hooks and TypeScript
- **Tailwind CSS**: Utility-first CSS framework
- **Chrome Extension API**: Manifest V3 compatibility
- **Local Storage**: Persistent data storage
- **Content Scripts**: Seamless integration with Kick.com

### Project Structure
```
src/
├── components/
│   ├── ModerationPanel.tsx    # Main moderation interface
│   └── ExtensionPopup.tsx     # Popup interface
├── contexts/
│   ├── AuthContext.tsx        # User authentication
│   ├── PointsContext.tsx      # Points and rewards
│   └── ModerationContext.tsx  # Moderation state
└── App.tsx                    # Main application component

public/
├── manifest.json              # Extension manifest
├── popup.html                 # Extension popup page
└── icons/                     # Extension icons
```

### Color Palette
- **Primary**: `#8A98DB` - Soft purple-blue
- **Secondary**: `#A36FDB` - Rich purple
- **Tertiary**: `#63C3DB` - Light blue
- **Accent**: `#4860D9` - Deep blue
- **Dark**: `#5E48D9` - Dark purple
- **Background**: `#1a1625` - Deep dark
- **Surface**: `#252036` - Card background

## 🔧 Configuration

### Extension Permissions
- **activeTab**: Access current Kick.com tab
- **storage**: Save user preferences and points
- **scripting**: Inject moderation panel
- **host_permissions**: Access Kick.com pages

### Moderation Settings
- **Auto Moderation**: Automatic spam detection
- **Spam Protection**: Advanced filtering rules
- **Sound Notifications**: Audio alerts for actions
- **Quick Modes**: One-click chat restrictions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Guidelines
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain Turkish/English localization
4. Test on both Chrome and Edge
5. Follow extension security guidelines

### Reporting Issues
- Use the [Issues](https://github.com/meatball-team/meatball-extension/issues) page
- Include browser version and steps to reproduce
- Provide screenshots for UI issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛡️ Privacy & Security

- **No Data Collection**: We don't collect personal data
- **Local Storage**: All data stored locally on your device
- **Secure Permissions**: Minimal required permissions only
- **Open Source**: Full transparency of code

## 🌍 Localization

- **🇹🇷 Turkish (Türkçe)**: Köfte - Native Turkish interface
- **🇺🇸 English**: Meatball - Full English support
- **More Languages**: Coming soon based on community demand

## 📞 Support

- **Discord**: [Join our community](https://discord.gg/meatball)
- **Email**: support@meatball.app
- **Documentation**: [Full docs](https://docs.meatball.app)
- **Updates**: [Follow on Twitter](https://twitter.com/meatball_app)

---

**Note**: This extension is not affiliated with Kick.com. It's a community-built tool to enhance the streaming experience for moderators and viewers.

**Made with ❤️ by the Meatball Team**
