import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  MessageSquare,
  Users,
  Settings,
  Trash2,
  Ban,
  Clock,
  Star,
  Crown,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { useModeration, ChatMessage, User } from '../contexts/ModerationContext';

interface ModerationPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ModerationPanel: React.FC<ModerationPanelProps> = ({ isOpen = true, onClose }) => {
  const {
    chatMessages,
    users,
    stats,
    isConnected,
    deleteMessage,
    highlightMessage,
    clearChat,
    banUser,
    timeoutUser,
    addVip,
    addMod,
    searchUsers,
    filterMessages
  } = useModeration();

  const [activeTab, setActiveTab] = useState<'chat' | 'users' | 'stats' | 'settings'>('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'deleted' | 'highlighted' | 'mods' | 'vips'>('all');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [chatMessages]);

  const filteredMessages = filterMessages(messageFilter).filter(msg =>
    !searchQuery || msg.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = searchUsers(searchQuery);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'mod':
        return <Shield size={12} className="text-meatball-accent" />;
      case 'vip':
        return <Star size={12} className="text-yellow-400" />;
      case 'subscriber':
        return <Crown size={12} className="text-meatball-primary" />;
      default:
        return null;
    }
  };

  const MessageComponent: React.FC<{ message: ChatMessage }> = ({ message }) => (
    <div 
      className={`chat-message group relative ${message.isDeleted ? 'deleted' : ''} ${message.isHighlighted ? 'highlighted' : ''}`}
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedMessage(message.id);
        setShowActionMenu(message.id);
      }}
    >
      <div className="flex items-start space-x-2">
        <span className="text-xs text-gray-400 w-12 flex-shrink-0">
          {formatTime(message.timestamp)}
        </span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 mb-1">
            <span 
              className={`font-medium text-sm ${
                message.badges.includes('mod') ? 'text-meatball-accent' :
                message.badges.includes('vip') ? 'text-yellow-400' :
                'text-white'
              }`}
              style={{ color: message.color }}
            >
              {message.username}
            </span>
            
            {message.badges.map((badge, index) => (
              <span key={index} className="flex-shrink-0">
                {getBadgeIcon(badge)}
              </span>
            ))}
          </div>
          
          <p className={`text-sm ${message.isDeleted ? 'line-through opacity-50' : 'text-gray-200'}`}>
            {message.message}
          </p>
        </div>

        {/* Action buttons - show on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <button
            onClick={() => highlightMessage(message.id)}
            className={`mod-action-btn ${message.isHighlighted ? 'text-yellow-400' : 'text-gray-400'}`}
            title="Highlight"
          >
            <Star size={12} />
          </button>
          
          {!message.isDeleted && (
            <button
              onClick={() => deleteMessage(message.id, 'Inappropriate message')}
              className="mod-action-btn text-red-400 hover:text-red-300"
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          )}
          
          <button
            onClick={() => setShowActionMenu(showActionMenu === message.id ? null : message.id)}
            className="mod-action-btn text-gray-400"
          >
            <MoreVertical size={12} />
          </button>
        </div>
      </div>

      {/* Action menu */}
      {showActionMenu === message.id && (
        <div className="absolute right-0 top-8 bg-meatball-surface border border-meatball-border rounded-lg shadow-lg py-1 z-10">
          <button
            onClick={() => {
              timeoutUser(message.userId, 5, 'Timeout from chat');
              setShowActionMenu(null);
            }}
            className="w-full px-3 py-1 text-left text-sm text-white hover:bg-meatball-border flex items-center space-x-2"
          >
            <Clock size={14} />
            <span>5 min timeout</span>
          </button>
          
          <button
            onClick={() => {
              banUser(message.userId, 'Banned from chat');
              setShowActionMenu(null);
            }}
            className="w-full px-3 py-1 text-left text-sm text-red-400 hover:bg-meatball-border flex items-center space-x-2"
          >
            <Ban size={14} />
            <span>Ban user</span>
          </button>
        </div>
      )}
    </div>
  );

  const UserComponent: React.FC<{ user: User }> = ({ user }) => (
    <div className="p-3 hover:bg-meatball-background/50 transition-colors border-l-2 border-transparent hover:border-meatball-primary/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
              user.isMod ? 'bg-meatball-accent text-white' :
              user.isVip ? 'bg-yellow-500 text-black' :
              'bg-gray-600 text-white'
            }`}>
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            
            {user.lastMessage && new Date().getTime() - user.lastMessage.getTime() < 5 * 60 * 1000 && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-meatball-surface"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-white truncate">
                {user.username}
              </span>
              
              {user.badges.map((badge, index) => (
                <span key={index}>
                  {getBadgeIcon(badge)}
                </span>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>{user.messageCount} mesaj</span>
              {user.isTimedOut && user.timeoutEnd && (
                <span className="text-orange-400">
                  Timeout: {Math.ceil((user.timeoutEnd.getTime() - Date.now()) / 60000)}d
                </span>
              )}
              {user.isBanned && (
                <span className="text-red-400">Banned</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-1">
          {!user.isMod && (
            <button
              onClick={() => addMod(user.id)}
              className="mod-action-btn text-meatball-accent"
              title="Make moderator"
            >
              <Shield size={14} />
            </button>
          )}
          
          {!user.isVip && (
            <button
              onClick={() => addVip(user.id)}
              className="mod-action-btn text-yellow-400"
              title="Make VIP"
            >
              <Star size={14} />
            </button>
          )}
          
          <button
            onClick={() => timeoutUser(user.id, 10, 'Manual timeout')}
            className="mod-action-btn text-orange-400"
            title="Timeout"
          >
            <Clock size={14} />
          </button>
          
          <button
            onClick={() => banUser(user.id, 'Manual ban')}
            className="mod-action-btn text-red-400"
            title="Ban"
          >
            <Ban size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`moderation-panel ${isOpen ? 'open' : ''} bg-meatball-surface`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-meatball-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-meatball-primary to-meatball-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Köfte</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-400">
                {isConnected ? 'Bağlı' : 'Bağlantı Kesildi'}
              </span>
            </div>
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex border-b border-meatball-border">
        {[
          { id: 'chat', label: 'Sohbet', icon: MessageSquare },
          { id: 'users', label: 'Kullanıcılar', icon: Users },
          { id: 'stats', label: 'İstatistik', icon: AlertTriangle },
          { id: 'settings', label: 'Ayarlar', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 py-3 px-2 text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-meatball-primary border-b-2 border-meatball-primary bg-meatball-primary/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {/* Search bar */}
        {(activeTab === 'chat' || activeTab === 'users') && (
          <div className="p-3 border-b border-meatball-border">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'chat' ? 'Mesaj ara...' : 'Kullanıcı ara...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-meatball-background border border-meatball-border rounded-lg text-sm text-white placeholder-gray-400 focus:border-meatball-primary focus:outline-none"
              />
            </div>
            
            {activeTab === 'chat' && (
              <div className="flex space-x-2 mt-2">
                {[
                  { id: 'all', label: 'Tümü' },
                  { id: 'mods', label: 'Modlar' },
                  { id: 'vips', label: 'VIPler' },
                  { id: 'deleted', label: 'Silinmiş' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setMessageFilter(filter.id as any)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      messageFilter === filter.id
                        ? 'bg-meatball-primary text-white'
                        : 'bg-meatball-background text-gray-400 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-3 bg-meatball-background/50">
              <span className="text-sm text-gray-400">
                {filteredMessages.length} mesaj
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={clearChat}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Sohbeti Temizle
                </button>
              </div>
            </div>
            
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto custom-scrollbar"
            >
              {filteredMessages.map((message) => (
                <MessageComponent key={message.id} message={message} />
              ))}
              
              {filteredMessages.length === 0 && (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-400 text-sm">Mesaj bulunamadı</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="flex flex-col h-full">
            <div className="p-3 bg-meatball-background/50">
              <span className="text-sm text-gray-400">
                {filteredUsers.length} kullanıcı ({stats.activeUsers} aktif)
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredUsers.map((user) => (
                <UserComponent key={user.id} user={user} />
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-400 text-sm">Kullanıcı bulunamadı</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-meatball-background rounded-lg p-3">
                <div className="text-2xl font-bold text-meatball-primary">
                  {stats.totalMessages}
                </div>
                <div className="text-xs text-gray-400">Toplam Mesaj</div>
              </div>
              
              <div className="bg-meatball-background rounded-lg p-3">
                <div className="text-2xl font-bold text-red-400">
                  {stats.deletedMessages}
                </div>
                <div className="text-xs text-gray-400">Silinmiş</div>
              </div>
              
              <div className="bg-meatball-background rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-400">
                  {stats.timedOutUsers}
                </div>
                <div className="text-xs text-gray-400">Timeout</div>
              </div>
              
              <div className="bg-meatball-background rounded-lg p-3">
                <div className="text-2xl font-bold text-red-500">
                  {stats.bannedUsers}
                </div>
                <div className="text-xs text-gray-400">Yasaklı</div>
              </div>
            </div>

            <div className="bg-meatball-background rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">Kullanıcı Durumu</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Toplam</span>
                  <span className="text-white">{stats.totalUsers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Aktif (10dk)</span>
                  <span className="text-green-400">{stats.activeUsers}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-4 space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Moderasyon Ayarları</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Otomatik mod modu</span>
                <button className="w-10 h-6 bg-gray-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Spam koruması</span>
                <button className="w-10 h-6 bg-meatball-primary rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Sesli bildirimler</span>
                <button className="w-10 h-6 bg-meatball-primary rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </button>
              </div>
            </div>

            <div className="border-t border-meatball-border pt-4">
              <h3 className="text-sm font-semibold text-white mb-3">Hızlı İşlemler</h3>
              
              <div className="space-y-2">
                <button className="w-full btn-secondary text-left">
                  Subscriber-only Mode
                </button>
                <button className="w-full btn-secondary text-left">
                  Follower-only Mode
                </button>
                <button className="w-full btn-secondary text-left">
                  Slow Mode (30s)
                </button>
                <button className="w-full btn-danger text-left">
                  Emergency Stop
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModerationPanel;