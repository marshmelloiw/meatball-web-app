import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Save, 
  Camera, 
  Mail, 
  Calendar,
  Clock,
  Coins,
  Trophy,
  Star,
  Settings,
  Shield,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePoints } from '../contexts/PointsContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { points } = usePoints();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: 'Yayın izlemeyi seven bir oyuncuyum. Valorant ve diğer FPS oyunlarını takip ediyorum.',
    location: 'Türkiye',
    website: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    pointsEarned: true,
    newFeatures: true,
    shopUpdates: false,
    emailMarketing: false
  });
  const [privacy, setPrivacy] = useState({
    showWatchTime: true,
    showPoints: false,
    showProfile: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}s ${minutes}d`;
  };

  const userLevel = Math.floor(points.totalPoints / 1000) + 1;
  const nextLevelPoints = userLevel * 1000;
  const progressToNextLevel = ((points.totalPoints % 1000) / 1000) * 100;

  const achievements = [
    { name: 'İlk Adım', earned: points.totalPoints >= 100, date: new Date('2024-01-15') },
    { name: 'Düzenli İzleyici', earned: points.totalPoints >= 1000, date: new Date('2024-01-20') },
    { name: 'Puan Ustası', earned: points.totalPoints >= 5000, date: null },
    { name: 'Zaman Öğretmeni', earned: points.watchingTime >= 36000, date: null }
  ];

  const tabs = [
    { id: 'profile', name: 'Profil', icon: <User size={16} /> },
    { id: 'stats', name: 'İstatistikler', icon: <Trophy size={16} /> },
    { id: 'settings', name: 'Ayarlar', icon: <Settings size={16} /> },
    { id: 'privacy', name: 'Gizlilik', icon: <Shield size={16} /> }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-gaming mb-2">
            Profil
          </h1>
          <p className="text-gray-400">
            Hesap bilgilerini yönet ve istatistiklerini gör
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-24 h-24 rounded-full border-4 border-kick-primary mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-kick-primary rounded-full flex items-center justify-center text-kick-dark hover:bg-kick-secondary transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{user?.username}</h2>
                <p className="text-gray-400">Seviye {userLevel}</p>
              </div>

              {/* Level Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Seviye {userLevel}</span>
                  <span>Seviye {userLevel + 1}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-kick-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressToNextLevel}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  {Math.floor(nextLevelPoints - points.totalPoints)} puan kaldı
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-kick-primary text-kick-dark'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Info */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Profil Bilgileri</h3>
                    <button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
                      <span>{isEditing ? 'Kaydet' : 'Düzenle'}</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="input-field w-full disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        E-posta
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="input-field w-full disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Konum
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="input-field w-full disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="input-field w-full disabled:opacity-50"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Hakkımda
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className="input-field w-full disabled:opacity-50 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="card">
                  <h3 className="text-xl font-bold text-white mb-6">Hesap Bilgileri</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">Katılma Tarihi</span>
                      </div>
                      <span className="text-white">{formatDate(user?.joinedAt || new Date())}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">E-posta Durumu</span>
                      </div>
                      <span className="text-green-400">Doğrulandı</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">Hesap Türü</span>
                      </div>
                      <span className="text-kick-primary capitalize">{user?.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card text-center">
                    <Coins className="w-8 h-8 text-kick-gold mx-auto mb-3" />
                    <div className="text-2xl font-bold text-kick-gold points-glow">
                      {Math.floor(points.totalPoints).toLocaleString()}
                    </div>
                    <div className="text-gray-400">Toplam Puan</div>
                  </div>

                  <div className="card text-center">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">
                      {formatTime(points.watchingTime)}
                    </div>
                    <div className="text-gray-400">İzleme Süresi</div>
                  </div>

                  <div className="card text-center">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{userLevel}</div>
                    <div className="text-gray-400">Seviye</div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="card">
                  <h3 className="text-xl font-bold text-white mb-6">Başarımlar</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          achievement.earned 
                            ? 'bg-kick-primary/10 border-kick-primary/30' 
                            : 'bg-gray-800 border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold ${
                            achievement.earned ? 'text-kick-primary' : 'text-gray-400'
                          }`}>
                            {achievement.name}
                          </h4>
                          {achievement.earned && (
                            <Trophy className="w-4 h-4 text-kick-gold" />
                          )}
                        </div>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(achievement.date)} tarihinde kazanıldı
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Notification Settings */}
                <div className="card">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Bell size={20} />
                    <span>Bildirim Ayarları</span>
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-gray-300">
                          {key === 'pointsEarned' && 'Puan kazanma bildirimleri'}
                          {key === 'newFeatures' && 'Yeni özellik duyuruları'}
                          {key === 'shopUpdates' && 'Mağaza güncellemeleri'}
                          {key === 'emailMarketing' && 'E-posta pazarlama'}
                        </span>
                        <button
                          onClick={() => setNotifications({
                            ...notifications,
                            [key]: !value
                          })}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-kick-primary' : 'bg-gray-600'
                          } relative`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-0.5'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Account Actions */}
                <div className="card">
                  <h3 className="text-xl font-bold text-white mb-6">Hesap İşlemleri</h3>
                  <div className="space-y-4">
                    <button className="w-full btn-secondary text-left">
                      Şifre Değiştir
                    </button>
                    <button className="w-full btn-secondary text-left">
                      İki Faktörlü Kimlik Doğrulama
                    </button>
                    <button className="w-full btn-secondary text-left">
                      Veri İndir
                    </button>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-left transition-colors">
                      Hesabı Sil
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                {/* Privacy Settings */}
                <div className="card">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Shield size={20} />
                    <span>Gizlilik Ayarları</span>
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {value ? <Eye size={16} className="text-green-400" /> : <EyeOff size={16} className="text-red-400" />}
                          <span className="text-gray-300">
                            {key === 'showWatchTime' && 'İzleme süresini göster'}
                            {key === 'showPoints' && 'Puanları göster'}
                            {key === 'showProfile' && 'Profili herkese göster'}
                          </span>
                        </div>
                        <button
                          onClick={() => setPrivacy({
                            ...privacy,
                            [key]: !value
                          })}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-kick-primary' : 'bg-gray-600'
                          } relative`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-0.5'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Usage */}
                <div className="card">
                  <h3 className="text-xl font-bold text-white mb-6">Veri Kullanımı</h3>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Hesabınızla ilgili toplanan verilerin nasıl kullanıldığını öğrenin.
                    </p>
                    <div className="space-y-2">
                      <button className="text-kick-primary hover:text-kick-secondary transition-colors">
                        Gizlilik Politikası
                      </button>
                      <br />
                      <button className="text-kick-primary hover:text-kick-secondary transition-colors">
                        Kullanım Koşulları
                      </button>
                      <br />
                      <button className="text-kick-primary hover:text-kick-secondary transition-colors">
                        Çerez Politikası
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;