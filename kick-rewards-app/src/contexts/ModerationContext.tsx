import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  userId: string;
  badges: string[];
  isDeleted: boolean;
  isHighlighted: boolean;
  color?: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  badges: string[];
  isFollower: boolean;
  isSubscriber: boolean;
  isMod: boolean;
  isVip: boolean;
  isBanned: boolean;
  isTimedOut: boolean;
  timeoutEnd?: Date;
  joinDate: Date;
  messageCount: number;
  lastMessage?: Date;
}

export interface ModerationAction {
  id: string;
  type: 'ban' | 'timeout' | 'delete' | 'warn' | 'vip' | 'mod' | 'unban';
  targetUserId: string;
  moderatorId: string;
  reason?: string;
  duration?: number; // for timeouts in minutes
  timestamp: Date;
}

export interface ModerationStats {
  totalMessages: number;
  deletedMessages: number;
  bannedUsers: number;
  timedOutUsers: number;
  totalUsers: number;
  activeUsers: number;
}

interface ModerationContextType {
  chatMessages: ChatMessage[];
  users: User[];
  moderationActions: ModerationAction[];
  stats: ModerationStats;
  isConnected: boolean;
  
  // Chat management
  deleteMessage: (messageId: string, reason?: string) => void;
  highlightMessage: (messageId: string) => void;
  clearChat: () => void;
  
  // User management
  banUser: (userId: string, reason?: string) => void;
  unbanUser: (userId: string) => void;
  timeoutUser: (userId: string, duration: number, reason?: string) => void;
  untimeoutUser: (userId: string) => void;
  addVip: (userId: string) => void;
  removeVip: (userId: string) => void;
  addMod: (userId: string) => void;
  removeMod: (userId: string) => void;
  
  // Filters and search
  searchUsers: (query: string) => User[];
  filterMessages: (filter: 'all' | 'deleted' | 'highlighted' | 'mods' | 'vips') => ChatMessage[];
  
  // Connection
  connect: () => void;
  disconnect: () => void;
}

const ModerationContext = createContext<ModerationContextType | undefined>(undefined);

export const useModeration = () => {
  const context = useContext(ModerationContext);
  if (context === undefined) {
    throw new Error('useModeration must be used within a ModerationProvider');
  }
  return context;
};

interface ModerationProviderProps {
  children: ReactNode;
}

export const ModerationProvider: React.FC<ModerationProviderProps> = ({ children }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [moderationActions, setModerationActions] = useState<ModerationAction[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Mock data for development
  useEffect(() => {
    // Simulate connection
    setIsConnected(true);
    
    // Generate mock users
    const mockUsers: User[] = [
      {
        id: '1',
        username: 'GameMaster2024',
        displayName: 'GameMaster2024',
        badges: ['subscriber', 'vip'],
        isFollower: true,
        isSubscriber: true,
        isMod: false,
        isVip: true,
        isBanned: false,
        isTimedOut: false,
        joinDate: new Date('2024-01-15'),
        messageCount: 45,
        lastMessage: new Date()
      },
      {
        id: '2',
        username: 'ToxicTroll',
        displayName: 'ToxicTroll',
        badges: [],
        isFollower: false,
        isSubscriber: false,
        isMod: false,
        isVip: false,
        isBanned: false,
        isTimedOut: true,
        timeoutEnd: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        joinDate: new Date('2024-01-20'),
        messageCount: 12,
        lastMessage: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '3',
        username: 'ModeratorBot',
        displayName: 'ModeratorBot',
        badges: ['mod', 'bot'],
        isFollower: true,
        isSubscriber: false,
        isMod: true,
        isVip: false,
        isBanned: false,
        isTimedOut: false,
        joinDate: new Date('2023-12-01'),
        messageCount: 156,
        lastMessage: new Date()
      }
    ];
    
    setUsers(mockUsers);

    // Generate mock chat messages
    const generateMockMessages = () => {
      const messages = [
        { user: 'GameMaster2024', text: 'Bu oyun çok güzel!' },
        { user: 'ViewerPro', text: 'Hangi rank bu?' },
        { user: 'ToxicTroll', text: 'Bu nasıl oynama amk' },
        { user: 'NiceViewer', text: 'GG güzel round' },
        { user: 'ModeratorBot', text: 'Lütfen saygılı olalım' },
        { user: 'SubscriberFan', text: 'Bu taktik çok iyi' },
        { user: 'RandomUser', text: 'Kaç saattir oynuyorsun?' },
        { user: 'ProGamer', text: 'Ace gelir mi?' }
      ];

      return messages.map((msg, index) => ({
        id: `msg-${index}`,
        username: msg.user,
        message: msg.text,
        timestamp: new Date(Date.now() - (messages.length - index) * 30000),
        userId: `user-${index}`,
        badges: msg.user === 'ModeratorBot' ? ['mod'] : 
               msg.user === 'GameMaster2024' ? ['vip', 'subscriber'] :
               msg.user === 'SubscriberFan' ? ['subscriber'] : [],
        isDeleted: false,
        isHighlighted: false,
        color: msg.user === 'ToxicTroll' ? '#ff6b6b' : undefined
      }));
    };

    setChatMessages(generateMockMessages());

    // Simulate new messages
    const messageInterval = setInterval(() => {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        username: ['NewUser', 'ChatUser', 'Viewer123', 'FanBoy'][Math.floor(Math.random() * 4)],
        message: ['Harika oynuyorsun!', 'Bu round kesin kazanırız', 'Skillerin çok iyi', 'GG'][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
        userId: `user-${Date.now()}`,
        badges: Math.random() > 0.7 ? ['subscriber'] : [],
        isDeleted: false,
        isHighlighted: false
      };
      
      setChatMessages(prev => [newMessage, ...prev.slice(0, 99)]);
    }, 15000);

    return () => clearInterval(messageInterval);
  }, []);

  const stats: ModerationStats = {
    totalMessages: chatMessages.length,
    deletedMessages: chatMessages.filter(msg => msg.isDeleted).length,
    bannedUsers: users.filter(user => user.isBanned).length,
    timedOutUsers: users.filter(user => user.isTimedOut).length,
    totalUsers: users.length,
    activeUsers: users.filter(user => user.lastMessage && 
      new Date().getTime() - user.lastMessage.getTime() < 10 * 60 * 1000).length
  };

  const deleteMessage = (messageId: string, reason?: string) => {
    setChatMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isDeleted: true } : msg
      )
    );
    
    // Add moderation action
    const action: ModerationAction = {
      id: `action-${Date.now()}`,
      type: 'delete',
      targetUserId: chatMessages.find(msg => msg.id === messageId)?.userId || '',
      moderatorId: 'current-mod',
      reason,
      timestamp: new Date()
    };
    
    setModerationActions(prev => [action, ...prev]);
  };

  const highlightMessage = (messageId: string) => {
    setChatMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isHighlighted: !msg.isHighlighted } : msg
      )
    );
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const banUser = (userId: string, reason?: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isBanned: true } : user
      )
    );
    
    const action: ModerationAction = {
      id: `action-${Date.now()}`,
      type: 'ban',
      targetUserId: userId,
      moderatorId: 'current-mod',
      reason,
      timestamp: new Date()
    };
    
    setModerationActions(prev => [action, ...prev]);
  };

  const unbanUser = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isBanned: false } : user
      )
    );
    
    const action: ModerationAction = {
      id: `action-${Date.now()}`,
      type: 'unban',
      targetUserId: userId,
      moderatorId: 'current-mod',
      timestamp: new Date()
    };
    
    setModerationActions(prev => [action, ...prev]);
  };

  const timeoutUser = (userId: string, duration: number, reason?: string) => {
    const timeoutEnd = new Date(Date.now() + duration * 60 * 1000);
    
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isTimedOut: true, timeoutEnd } : user
      )
    );
    
    const action: ModerationAction = {
      id: `action-${Date.now()}`,
      type: 'timeout',
      targetUserId: userId,
      moderatorId: 'current-mod',
      reason,
      duration,
      timestamp: new Date()
    };
    
    setModerationActions(prev => [action, ...prev]);

    // Auto-remove timeout
    setTimeout(() => {
      untimeoutUser(userId);
    }, duration * 60 * 1000);
  };

  const untimeoutUser = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isTimedOut: false, timeoutEnd: undefined } : user
      )
    );
  };

  const addVip = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isVip: true } : user
      )
    );
    
    const action: ModerationAction = {
      id: `action-${Date.now()}`,
      type: 'vip',
      targetUserId: userId,
      moderatorId: 'current-mod',
      timestamp: new Date()
    };
    
    setModerationActions(prev => [action, ...prev]);
  };

  const removeVip = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isVip: false } : user
      )
    );
  };

  const addMod = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isMod: true } : user
      )
    );
    
    const action: ModerationAction = {
      id: `action-${Date.now()}`,
      type: 'mod',
      targetUserId: userId,
      moderatorId: 'current-mod',
      timestamp: new Date()
    };
    
    setModerationActions(prev => [action, ...prev]);
  };

  const removeMod = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isMod: false } : user
      )
    );
  };

  const searchUsers = (query: string): User[] => {
    if (!query) return users;
    return users.filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.displayName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterMessages = (filter: 'all' | 'deleted' | 'highlighted' | 'mods' | 'vips'): ChatMessage[] => {
    switch (filter) {
      case 'deleted':
        return chatMessages.filter(msg => msg.isDeleted);
      case 'highlighted':
        return chatMessages.filter(msg => msg.isHighlighted);
      case 'mods':
        return chatMessages.filter(msg => msg.badges.includes('mod'));
      case 'vips':
        return chatMessages.filter(msg => msg.badges.includes('vip'));
      default:
        return chatMessages;
    }
  };

  const connect = () => {
    setIsConnected(true);
  };

  const disconnect = () => {
    setIsConnected(false);
  };

  const value: ModerationContextType = {
    chatMessages,
    users,
    moderationActions,
    stats,
    isConnected,
    deleteMessage,
    highlightMessage,
    clearChat,
    banUser,
    unbanUser,
    timeoutUser,
    untimeoutUser,
    addVip,
    removeVip,
    addMod,
    removeMod,
    searchUsers,
    filterMessages,
    connect,
    disconnect
  };

  return (
    <ModerationContext.Provider value={value}>
      {children}
    </ModerationContext.Provider>
  );
};