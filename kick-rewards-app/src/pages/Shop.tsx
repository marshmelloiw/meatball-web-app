import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Crown, 
  Zap, 
  Gift, 
  Coins,
  Filter,
  Search,
  Check,
  X
} from 'lucide-react';
import { usePoints } from '../contexts/PointsContext';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'features' | 'cosmetics' | 'boosts' | 'rewards';
  icon: React.ReactNode;
  featured?: boolean;
  limited?: boolean;
  discount?: number;
}

const Shop: React.FC = () => {
  const { points, spendPoints } = usePoints();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [purchaseModal, setPurchaseModal] = useState<ShopItem | null>(null);

  const shopItems: ShopItem[] = [
    {
      id: '1',
      name: 'VIP Rozet',
      description: 'Profilinde VIP rozeti göster ve özel sohbet rengi kazan',
      price: 500,
      category: 'cosmetics',
      icon: <Crown className="w-6 h-6 text-kick-gold" />,
      featured: true
    },
    {
      id: '2',
      name: '2x Puan Çarpanı',
      description: '1 hafta boyunca 2x puan kazanın',
      price: 750,
      category: 'boosts',
      icon: <Zap className="w-6 h-6 text-kick-primary" />,
      limited: true
    },
    {
      id: '3',
      name: 'Özel Emoji Paketi',
      description: 'Sohbette kullanabileceğin özel emoji paketleri',
      price: 300,
      category: 'cosmetics',
      icon: <Star className="w-6 h-6 text-yellow-400" />
    },
    {
      id: '4',
      name: 'Reklamsız Deneyim',
      description: '1 ay reklamsız yayın izleme deneyimi',
      price: 1000,
      category: 'features',
      icon: <X className="w-6 h-6 text-red-400" />,
      discount: 20
    },
    {
      id: '5',
      name: 'Steam Oyun Kuponu',
      description: '50₺ değerinde Steam oyun kuponu',
      price: 2000,
      category: 'rewards',
      icon: <Gift className="w-6 h-6 text-blue-400" />,
      featured: true
    },
    {
      id: '6',
      name: 'Özel Kullanıcı Adı Rengi',
      description: 'Sohbette özel renk ile öne çık',
      price: 400,
      category: 'cosmetics',
      icon: <Star className="w-6 h-6 text-purple-400" />
    },
    {
      id: '7',
      name: '5x Puan Bonusu',
      description: 'Anında 5000 bonus puan kazan',
      price: 1500,
      category: 'boosts',
      icon: <Coins className="w-6 h-6 text-kick-gold" />,
      limited: true
    },
    {
      id: '8',
      name: 'PlayStation Store',
      description: '100₺ PlayStation Store kuponu',
      price: 4000,
      category: 'rewards',
      icon: <Gift className="w-6 h-6 text-blue-600" />
    }
  ];

  const categories = [
    { id: 'all', name: 'Tümü', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'features', name: 'Özellikler', icon: <Zap className="w-4 h-4" /> },
    { id: 'cosmetics', name: 'Kozmetik', icon: <Star className="w-4 h-4" /> },
    { id: 'boosts', name: 'Güçlendirici', icon: <Crown className="w-4 h-4" /> },
    { id: 'rewards', name: 'Ödüller', icon: <Gift className="w-4 h-4" /> }
  ];

  const filteredItems = shopItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePurchase = (item: ShopItem) => {
    const finalPrice = item.discount ? Math.floor(item.price * (1 - item.discount / 100)) : item.price;
    
    if (points.totalPoints >= finalPrice) {
      const success = spendPoints(finalPrice, `Satın alındı: ${item.name}`);
      if (success) {
        setPurchaseModal(null);
        // Show success notification here
      }
    }
  };

  const getDiscountedPrice = (item: ShopItem) => {
    return item.discount ? Math.floor(item.price * (1 - item.discount / 100)) : item.price;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-gaming mb-2">
            Mağaza
          </h1>
          <p className="text-gray-400">
            Puanlarınızla özel özellikler, kozmetikler ve ödüller satın alın
          </p>
        </div>

        {/* Balance Card */}
        <div className="card bg-gradient-to-r from-kick-primary/20 to-kick-secondary/20 border-kick-primary/30 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-kick-primary rounded-xl flex items-center justify-center">
                <Coins size={24} className="text-kick-dark" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Mevcut Bakiye</p>
                <p className="text-2xl font-bold text-kick-gold points-glow">
                  {Math.floor(points.totalPoints).toLocaleString()} Puan
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Bu hafta kazanılan</p>
              <p className="text-lg font-semibold text-white">
                +{Math.floor(points.weeklyPoints).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 w-full max-w-md"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-kick-primary text-kick-dark'
                    : 'bg-kick-dark text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Items */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-kick-gold" />
              <span>Öne Çıkanlar</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItems.filter(item => item.featured).map((item) => (
                <div 
                  key={item.id} 
                  className="card border-kick-primary/30 bg-gradient-to-br from-kick-primary/10 to-transparent hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-kick-dark rounded-lg flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-kick-gold text-kick-dark font-medium">
                          Öne Çıkan
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-kick-gold" />
                      <span className="font-bold text-kick-gold">
                        {getDiscountedPrice(item).toLocaleString()}
                      </span>
                      {item.discount && (
                        <span className="text-gray-400 line-through text-sm">
                          {item.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setPurchaseModal(item)}
                      disabled={points.totalPoints < getDiscountedPrice(item)}
                      className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Satın Al
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Items */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            {selectedCategory === 'all' ? 'Tüm Ürünler' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aradığınız kriterlere uygun ürün bulunamadı</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="card hover:border-kick-primary/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-kick-dark rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex flex-col space-y-1">
                      {item.limited && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-500 text-white font-medium">
                          Sınırlı
                        </span>
                      )}
                      {item.discount && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500 text-white font-medium">
                          %{item.discount} İndirim
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-kick-gold" />
                      <span className="font-bold text-kick-gold">
                        {getDiscountedPrice(item).toLocaleString()}
                      </span>
                      {item.discount && (
                        <span className="text-gray-400 line-through text-sm">
                          {item.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setPurchaseModal(item)}
                      disabled={points.totalPoints < getDiscountedPrice(item)}
                      className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Satın Al
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Modal */}
        {purchaseModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="card max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Satın Alma Onayı</h3>
                <button
                  onClick={() => setPurchaseModal(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-kick-dark rounded-lg flex items-center justify-center">
                  {purchaseModal.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{purchaseModal.name}</h4>
                  <p className="text-gray-400 text-sm">{purchaseModal.description}</p>
                </div>
              </div>
              
              <div className="bg-kick-darker rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Fiyat:</span>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-kick-gold" />
                    <span className="text-kick-gold font-bold">
                      {getDiscountedPrice(purchaseModal).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Mevcut Bakiye:</span>
                  <span className="text-white">{Math.floor(points.totalPoints).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Kalan:</span>
                  <span className={`font-semibold ${
                    points.totalPoints - getDiscountedPrice(purchaseModal) >= 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {(points.totalPoints - getDiscountedPrice(purchaseModal)).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setPurchaseModal(null)}
                  className="flex-1 btn-secondary"
                >
                  İptal
                </button>
                <button
                  onClick={() => handlePurchase(purchaseModal)}
                  disabled={points.totalPoints < getDiscountedPrice(purchaseModal)}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Check size={16} />
                  <span>Onayla</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;