import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Star, 
  TrendingUp, 
  Users, 
  Gift, 
  Coins,
  Clock,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const featuredStreams = [
    {
      id: '1',
      title: 'Valorant Pro Maçları',
      streamer: 'ProGamer123',
      viewers: 15420,
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      category: 'Valorant',
      isLive: true
    },
    {
      id: '2',
      title: 'Just Chatting & Reaktions',
      streamer: 'ChatMaster',
      viewers: 8930,
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      category: 'Just Chatting',
      isLive: true
    },
    {
      id: '3',
      title: 'Minecraft Creative Building',
      streamer: 'BuilderPro',
      viewers: 5670,
      thumbnail: 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=300&fit=crop',
      category: 'Minecraft',
      isLive: true
    },
    {
      id: '4',
      title: 'League of Legends Ranked',
      streamer: 'LoLMaster',
      viewers: 12350,
      thumbnail: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop',
      category: 'League of Legends',
      isLive: true
    }
  ];

  const features = [
    {
      icon: <Coins className="w-8 h-8 text-kick-gold" />,
      title: 'Puan Kazan',
      description: 'Yayın izleyerek otomatik olarak puan kazanın'
    },
    {
      icon: <Gift className="w-8 h-8 text-kick-accent" />,
      title: 'Ödüller Satın Al',
      description: 'Puanlarınızla özel özellikler ve hediyeler satın alın'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-kick-primary" />,
      title: 'Seviye Atlat',
      description: 'Daha fazla izleyerek seviye atlayın ve bonuslar kazanın'
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      title: 'VIP Statü',
      description: 'Özel VIP özelliklerine erişim kazanın'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-kick-dark via-transparent to-kick-dark"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-kick-primary to-kick-secondary bg-clip-text text-transparent font-gaming">
            İzle, Kazan, Harca!
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            En sevdiğin yayıncıları izleyerek puan kazan ve bu puanlarla özel özellikler satın al. 
            Kick platformunda yeni bir deneyim!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  Hemen Başla
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Giriş Yap
                </Link>
              </>
            ) : (
              <Link to="/shop" className="btn-primary text-lg px-8 py-4">
                Mağazaya Git
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-kick-dark/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Nasıl Çalışır?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Streams */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Öne Çıkan Yayınlar
            </h2>
            <div className="flex items-center space-x-2 text-kick-primary">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">CANLI</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStreams.map((stream) => (
              <Link 
                key={stream.id} 
                to={`/stream/${stream.id}`}
                className="group block"
              >
                <div className="card hover:border-kick-primary transition-all duration-300 overflow-hidden p-0">
                  <div className="relative">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>CANLI</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{stream.viewers.toLocaleString()}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-kick-primary transition-colors">
                      {stream.title}
                    </h3>
                    <p className="text-gray-400 mb-2">{stream.streamer}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {stream.category}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Users size={14} />
                        <span>{stream.viewers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-kick-dark/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Platform İstatistikleri
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="card">
              <div className="text-4xl font-bold text-kick-primary mb-2">1.2M+</div>
              <div className="text-gray-400">Aktif Kullanıcı</div>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-kick-gold mb-2">50M+</div>
              <div className="text-gray-400">Dağıtılan Puan</div>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-kick-accent mb-2">10K+</div>
              <div className="text-gray-400">Yayıncı</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Hemen Başlamaya Hazır mısın?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ücretsiz hesap oluştur ve izlediğin her dakika için puan kazanmaya başla!
            </p>
            <Link to="/register" className="btn-primary text-xl px-10 py-5 glow">
              Ücretsiz Katıl
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;