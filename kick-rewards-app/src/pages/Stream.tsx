import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Users, 
  Heart, 
  Share2,
  Gift,
  Coins,
  Send,
  Settings,
  Eye,
  MessageCircle
} from 'lucide-react';
import { usePoints } from '../contexts/PointsContext';
import { useAuth } from '../contexts/AuthContext';

const Stream: React.FC = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const { isWatching, startWatching, stopWatching, points } = usePoints();
  const { user, isAuthenticated } = useAuth();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    username: string;
    message: string;
    timestamp: Date;
    isVip?: boolean;
  }>>([]);

  // Mock stream data
  const streamData = {
    id: streamId,
    title: 'Valorant Pro Maçları - Rank Yolculuğu',
    streamer: 'ProGamer123',
    viewers: 15420,
    category: 'Valorant',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
    isLive: true,
    description: 'Bugün Immortal rank\'e çıkmaya çalışıyoruz! Takım olarak güzel maçlar oynuyoruz.',
    tags: ['Valorant', 'Competitive', 'Turkish', 'Pro'],
    pointsPerMinute: 2
  };

  useEffect(() => {
    // Simulate chat messages
    const interval = setInterval(() => {
      const mockMessages = [
        'GG güzel oynuyorsun!',
        'Bu round kesin kazanırız',
        'Ace gelir mi?',
        'Takım güzel oynuyor',
        'Skill çok iyi',
        'Hangi rank?',
        'Taktik çok güzel',
        'Bu silahı nereden aldın?'
      ];
      
      const usernames = ['Viewer123', 'GameFan', 'ProWatcher', 'SkillMaster', 'TurkishGamer', 'ValorantPro'];
      
      setChatMessages(prev => [
        {
          id: Date.now().toString(),
          username: usernames[Math.floor(Math.random() * usernames.length)],
          message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
          timestamp: new Date(),
          isVip: Math.random() > 0.8
        },
        ...prev.slice(0, 49) // Keep last 50 messages
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && !isWatching) {
      startWatching();
    } else if (isPlaying && isWatching) {
      stopWatching();
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim() && user) {
      setChatMessages(prev => [{
        id: Date.now().toString(),
        username: user.username,
        message: chatMessage.trim(),
        timestamp: new Date(),
        isVip: false
      }, ...prev.slice(0, 49)]);
      setChatMessage('');
    }
  };

  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-kick-darker">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-3 space-y-4">
            {/* Video Container */}
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
              <img 
                src={streamData.thumbnail} 
                alt={streamData.title}
                className="w-full h-full object-cover"
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white ml-1" />}
                  </button>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-kick-primary transition-colors"
                    >
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    <div className="flex items-center space-x-2 text-white">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold">CANLI</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-white">
                      <Eye size={16} />
                      <span className="text-sm">{formatViewers(streamData.viewers)}</span>
                    </div>
                    <button className="text-white hover:text-kick-primary transition-colors">
                      <Settings size={20} />
                    </button>
                    <button className="text-white hover:text-kick-primary transition-colors">
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>CANLI</span>
              </div>

              {/* Points Indicator */}
              {isWatching && (
                <div className="absolute top-4 right-4 bg-kick-primary/90 text-kick-dark px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 animate-pulse">
                  <Coins size={16} />
                  <span>+{streamData.pointsPerMinute}/dk</span>
                </div>
              )}
            </div>

            {/* Stream Info */}
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{streamData.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="font-semibold text-kick-primary">{streamData.streamer}</span>
                    <span>•</span>
                    <span>{streamData.category}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{streamData.viewers.toLocaleString()} izleyici</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="btn-secondary flex items-center space-x-2">
                    <Heart size={16} />
                    <span>Takip Et</span>
                  </button>
                  <button className="btn-primary flex items-center space-x-2">
                    <Gift size={16} />
                    <span>Bağış</span>
                  </button>
                  <button className="btn-secondary">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{streamData.description}</p>

              <div className="flex flex-wrap gap-2">
                {streamData.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Points Earning Info */}
            {isAuthenticated && (
              <div className="card bg-gradient-to-r from-kick-primary/20 to-kick-secondary/20 border-kick-primary/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-kick-primary rounded-xl flex items-center justify-center">
                      <Coins size={24} className="text-kick-dark" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Puan Kazanıyorsun!</h3>
                      <p className="text-gray-300">
                        {isWatching 
                          ? `Dakikada ${streamData.pointsPerMinute} puan kazanıyorsun`
                          : 'Yayını başlat ve puan kazanmaya başla'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-kick-gold font-bold text-xl points-glow">
                      {Math.floor(points.totalPoints).toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">Toplam puan</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <div className="card h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <MessageCircle size={20} />
                  <span>Sohbet</span>
                </h3>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users size={16} />
                  <span className="text-sm">{formatViewers(streamData.viewers)}</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <span className={`font-semibold ${
                      message.isVip ? 'text-kick-gold' : 
                      message.username === user?.username ? 'text-kick-primary' : 'text-gray-300'
                    }`}>
                      {message.isVip && '👑 '}
                      {message.username}:
                    </span>
                    <span className="text-gray-300 ml-1">{message.message}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Mesaj yazın..."
                    className="flex-1 input-field text-sm py-2"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 bg-kick-darker rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Sohbete katılmak için giriş yapın</p>
                  <button className="btn-primary text-sm">Giriş Yap</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stream;