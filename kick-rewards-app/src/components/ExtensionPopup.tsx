import React, { useState, useEffect } from 'react';
import {
  Coins,
  ShoppingBag,
  User,
  Settings,
  Star,
  Gift,
  Crown,
  Zap,
  TrendingUp,
  Award,
  Shield,
  Target,
  ExternalLink,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePoints } from '../contexts/PointsContext';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: 'features' | 'cosmetics' | 'boosts';
  featured?: boolean;
}

const ExtensionPopup: React.FC = () => {
  const { user, isAuthenticated, login } = useAuth();
  const { points, spendPoints } = usePoints();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shop' | 'profile'>('dashboard');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  // Mock shop items for the popup
  const shopItems: ShopItem[] = [
    {
      id: '1',
      name: 'VIP Rozet',
      description: 'Özel VIP rozeti ve sohbet rengi',
      price: 500,
      icon: <Crown className="w-4 h-4" />,
      category: 'cosmetics',
      featured: true
    },
    {
      id: '2',
      name: '2x Puan Çarpanı',
      description: '1 hafta boyunca 2x puan',
      price: 750,
      icon: <Zap className="w-4 h-4" />,
      category: 'boosts',
      featured: true
    },
    {
      id: '3',
      name: 'Özel Emoji',
      description: 'Sohbette özel emoji kullanımı',
      price: 300,
      icon: <Star className="w-4 h-4" />,
      category: 'cosmetics'
    },
    {
      id: '4',
      name: 'Moderatör Araçları',
      description: 'Gelişmiş moderasyon paneli',
      price: 1000,
      icon: <Shield className="w-4 h-4" />,
      category: 'features'
    }
  ];

  const featuredItems = shopItems.filter(item => item.featured);

  const handlePurchase = (item: ShopItem) => {
    if (points.totalPoints >= item.price) {
      const success = spendPoints(item.price, `Satın alındı: ${item.name}`);
      if (success) {
        setSelectedItem(null);
        // Show success notification
      }
    }
  };

  const handleQuickLogin = async () => {
    await login('demo@meatball.app', 'demo123');
  };

  const openModerationPanel = () => {
    // Send message to content script to open moderation panel
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'openModerationPanel' });
        }
      });
    } else {
      // Fallback for development - just show an alert
      alert('Moderasyon paneli Kick.com\'da çalışır. Extension olarak kurulduğunda aktif olacak.');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (!isAuthenticated) {
    return (
      <div className="extension-popup bg-meatball-background p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-meatball-primary to-meatball-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">K</span>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Köfte</h1>
          <p className="text-gray-400 text-sm mb-6">
            Kick moderasyon ve ödül sistemi
          </p>

          <div className="space-y-3">
            <button
              onClick={handleQuickLogin}
              className="w-full btn-primary"
            >
              Demo Hesabı ile Giriş
            </button>
            
            <div className="text-xs text-gray-500 text-center">
              Gerçek hesabınızla giriş yapmak için kick.com'da giriş yapın
            </div>
          </div>

          <div className="mt-6 p-4 bg-meatball-surface rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Özellikler</h3>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Gelişmiş moderasyon paneli</li>
              <li>• Puan kazanma sistemi</li>
              <li>• Özel ödüller mağazası</li>
              <li>• Gerçek zamanlı istatistikler</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="extension-popup bg-meatball-background">
      {/* Header */}
      <div className="p-4 border-b border-meatball-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-meatball-primary to-meatball-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Köfte</h1>
              <p className="text-xs text-gray-400">{user?.username}</p>
            </div>
          </div>
          
          <button
            onClick={openModerationPanel}
            className="p-2 bg-meatball-surface hover:bg-meatball-border rounded-lg transition-colors"
            title="Moderasyon Panelini Aç"
          >
            <Shield size={16} className="text-meatball-primary" />
          </button>
        </div>
        
        {/* Points Display */}
        <div className="mt-3 bg-gradient-to-r from-meatball-primary/10 to-meatball-secondary/10 border border-meatball-primary/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-meatball-primary" />
              <span className="text-lg font-bold text-white points-glow">
                {formatNumber(Math.floor(points.totalPoints))}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Bu hafta</p>
              <p className="text-sm text-meatball-primary font-semibold">
                +{formatNumber(Math.floor(points.weeklyPoints))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-meatball-border">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'shop', label: 'Mağaza', icon: ShoppingBag },
          { id: 'profile', label: 'Profil', icon: User }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-meatball-primary border-b-2 border-meatball-primary bg-meatball-primary/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto extension-scrollbar">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="p-4 space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-meatball-surface rounded-lg p-3 text-center">
                <TrendingUp className="w-6 h-6 text-meatball-primary mx-auto mb-1" />
                <div className="text-lg font-bold text-white">
                  {Math.floor(points.totalPoints / 1000) + 1}
                </div>
                <div className="text-xs text-gray-400">Seviye</div>
              </div>
              
              <div className="bg-meatball-surface rounded-lg p-3 text-center">
                <Target className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">
                  {Math.floor(points.watchingTime / 3600)}s
                </div>
                <div className="text-xs text-gray-400">İzleme</div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-meatball-surface rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Seviye İlerlemesi</span>
                <span className="text-xs text-meatball-primary">
                  Lv. {Math.floor(points.totalPoints / 1000) + 1}
                </span>
              </div>
              
              <div className="w-full bg-meatball-background rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-meatball-primary to-meatball-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((points.totalPoints % 1000) / 1000) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                <span>{Math.floor(points.totalPoints % 1000)}/1000 XP</span>
                <span>{Math.floor(1000 - (points.totalPoints % 1000))} kaldı</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">Hızlı İşlemler</h3>
              
              <button
                onClick={openModerationPanel}
                className="w-full flex items-center space-x-3 p-3 bg-meatball-surface hover:bg-meatball-border rounded-lg transition-colors"
              >
                <Shield className="w-5 h-5 text-meatball-accent" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">Moderasyon Paneli</div>
                  <div className="text-xs text-gray-400">Sohbet yönetimi ve kullanıcı kontrolü</div>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('shop')}
                className="w-full flex items-center space-x-3 p-3 bg-meatball-surface hover:bg-meatball-border rounded-lg transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-meatball-primary" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">Mağaza</div>
                  <div className="text-xs text-gray-400">Özel özellikler ve ödüller</div>
                </div>
              </button>
            </div>

            {/* Featured Items */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">Öne Çıkanlar</h3>
              
              {featuredItems.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-meatball-surface hover:bg-meatball-border rounded-lg transition-colors cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-meatball-background rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.price} puan</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(item);
                    }}
                    disabled={points.totalPoints < item.price}
                    className="px-3 py-1 bg-meatball-primary text-white text-xs rounded-lg hover:bg-meatball-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Satın Al
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shop Tab */}
        {activeTab === 'shop' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Mağaza</h2>
              <div className="flex items-center space-x-1 text-sm">
                <Coins className="w-4 h-4 text-meatball-primary" />
                <span className="text-white font-semibold">
                  {formatNumber(Math.floor(points.totalPoints))}
                </span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex space-x-2 text-xs">
              <button className="px-3 py-1 bg-meatball-primary text-white rounded-full">
                Tümü
              </button>
              <button className="px-3 py-1 bg-meatball-surface text-gray-400 rounded-full hover:text-white">
                Özellikler
              </button>
              <button className="px-3 py-1 bg-meatball-surface text-gray-400 rounded-full hover:text-white">
                Kozmetik
              </button>
            </div>

            {/* Shop Items */}
            <div className="space-y-3">
              {shopItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-meatball-surface hover:bg-meatball-border rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-meatball-background rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-white">{item.name}</span>
                        {item.featured && (
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <div className="text-xs text-gray-400 truncate">{item.description}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Coins className="w-3 h-3 text-meatball-primary" />
                        <span className="text-xs text-meatball-primary font-semibold">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={points.totalPoints < item.price}
                    className="px-3 py-1 bg-meatball-primary text-white text-xs rounded-lg hover:bg-meatball-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Satın Al
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            {/* User Info */}
            <div className="bg-meatball-surface rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-meatball-primary to-meatball-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{user?.username}</h3>
                  <p className="text-sm text-gray-400">Seviye {Math.floor(points.totalPoints / 1000) + 1}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-meatball-primary">
                    {formatNumber(Math.floor(points.totalPoints))}
                  </div>
                  <div className="text-xs text-gray-400">Toplam Puan</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    {Math.floor(points.watchingTime / 3600)}s
                  </div>
                  <div className="text-xs text-gray-400">İzleme Süresi</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">Başarımlar</h3>
              
              {[
                { name: 'İlk Adım', completed: points.totalPoints >= 100, progress: Math.min(points.totalPoints / 100, 1) },
                { name: 'Puan Ustası', completed: points.totalPoints >= 1000, progress: Math.min(points.totalPoints / 1000, 1) },
                { name: 'Zaman Efendisi', completed: points.watchingTime >= 3600, progress: Math.min(points.watchingTime / 3600, 1) }
              ].map((achievement, index) => (
                <div key={index} className="bg-meatball-surface rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${achievement.completed ? 'text-meatball-primary' : 'text-white'}`}>
                      {achievement.name}
                    </span>
                    {achievement.completed && (
                      <Award className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  
                  <div className="w-full bg-meatball-background rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        achievement.completed ? 'bg-meatball-primary' : 'bg-gray-600'
                      }`}
                      style={{ width: `${achievement.progress * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-1">
                    {Math.floor(achievement.progress * 100)}% tamamlandı
                  </div>
                </div>
              ))}
            </div>

            {/* Settings */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">Ayarlar</h3>
              
              <button className="w-full flex items-center justify-between p-3 bg-meatball-surface hover:bg-meatball-border rounded-lg transition-colors">
                <span className="text-sm text-white">Bildirimler</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-meatball-surface hover:bg-meatball-border rounded-lg transition-colors">
                <span className="text-sm text-white">Gizlilik</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-meatball-surface hover:bg-meatball-border rounded-lg transition-colors">
                <span className="text-sm text-white">Hakkında</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtensionPopup;