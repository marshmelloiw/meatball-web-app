import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Star, 
  TrendingUp, 
  Users, 
  Settings, 
  Coins,
  MessageSquare,
  BarChart3,
  Award,
  Zap,
  Crown,
  Ban
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Gelişmiş Moderasyon',
      description: 'Twitch benzeri profesyonel moderasyon araçları ile sohbeti kontrol edin',
      color: 'text-meatball-accent'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Gerçek Zamanlı Sohbet',
      description: 'Mesajları anında yönetin, filtreleyin ve moderasyon işlemleri yapın',
      color: 'text-meatball-primary'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Kullanıcı Yönetimi',
      description: 'Ban, timeout, VIP ve mod yetkilerini tek tıkla verin',
      color: 'text-meatball-secondary'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Canlı İstatistikler',
      description: 'Sohbet aktivitesi ve kullanıcı analitiklerini takip edin',
      color: 'text-meatball-tertiary'
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: 'Ödül Sistemi',
      description: 'Puan kazanın, özel özellikler satın alın ve seviye atlayın',
      color: 'text-yellow-400'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Özelleştirilebilir',
      description: 'Moderasyon ayarlarını ihtiyaçlarınıza göre yapılandırın',
      color: 'text-gray-400'
    }
  ];

  const stats = [
    { label: 'Aktif Moderatörler', value: '2,500+', icon: Shield },
    { label: 'Desteklenen Kanallar', value: '10,000+', icon: Users },
    { label: 'Günlük Mesaj', value: '1M+', icon: MessageSquare },
    { label: 'Memnuniyet Oranı', value: '98%', icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-meatball-primary/10 via-meatball-secondary/5 to-meatball-tertiary/10"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-meatball-primary to-meatball-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-meatball-lg">
              <span className="text-white font-bold text-4xl">K</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
            <span className="gradient-text">Köfte</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Kick platformu için gelişmiş moderasyon paneli ve ödül sistemi. Yayın yönetimini bir üst seviyeye taşıyın!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-primary">
                  Dashboard'a Git
                </Link>
                <Link to="/shop" className="btn-secondary">
                  Mağazayı Keşfet
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn-primary">
                  Hemen Başla
                </Link>
                <Link to="/login" className="btn-secondary">
                  Giriş Yap
                </Link>
              </>
            )}
          </div>

          {/* Browser Extension Notice */}
          <div className="bg-meatball-surface/50 border border-meatball-border rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-meatball-primary" />
              <span className="text-lg font-semibold text-white">Browser Extension</span>
            </div>
            <p className="text-gray-300 text-sm">
              Köfte, Kick.com'da otomatik olarak çalışan bir browser extension'dır. 
              Chrome veya Edge'e yükleyin ve moderasyon paneli otomatik olarak aktif olsun.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Neden <span className="gradient-text">Köfte</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Profesyonel moderatörler için tasarlanmış, Twitch kalitesinde araçlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card-hover group"
              >
                <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
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

      {/* Stats Section */}
      <section className="py-16 px-4 bg-meatball-surface/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Platform İstatistikleri
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-meatball-primary/20 to-meatball-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-meatball-border">
                  <stat.icon className="w-8 h-8 text-meatball-primary" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moderation Tools Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Moderasyon Araçları
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Kick.com'da profesyonel seviyede sohbet yönetimi
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Ban className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Hızlı Moderasyon
                  </h3>
                  <p className="text-gray-400">
                    Mesajları tek tıkla silin, kullanıcıları banla veya timeout verin
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Yetki Yönetimi
                  </h3>
                  <p className="text-gray-400">
                    VIP ve moderatör yetkilerini kolayca verin veya alın
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-meatball-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-meatball-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Canlı Analitik
                  </h3>
                  <p className="text-gray-400">
                    Sohbet aktivitesi ve kullanıcı istatistiklerini takip edin
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-meatball-surface/50 rounded-2xl p-8 border border-meatball-border">
              <div className="text-center">
                <Shield className="w-16 h-16 text-meatball-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Moderasyon Paneli
                </h3>
                <p className="text-gray-400 mb-6">
                  Kick.com'da otomatik olarak aktif olan yan panel ile tüm moderasyon işlemlerinizi gerçekleştirin.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Sohbet Mesajları</span>
                    <span className="text-meatball-primary font-semibold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Aktif Kullanıcılar</span>
                    <span className="text-meatball-primary font-semibold">89</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Moderasyon İşlemleri</span>
                    <span className="text-meatball-primary font-semibold">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-meatball-primary/10 via-meatball-secondary/10 to-meatball-tertiary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Moderasyonu Profesyonelleştirin
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Köfte ile Kick.com'da moderasyon deneyiminizi bir üst seviyeye taşıyın
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <>
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  Ücretsiz Başla
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Giriş Yap
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                Dashboard'a Git
              </Link>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Browser extension olarak Chrome ve Edge'de çalışır
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;