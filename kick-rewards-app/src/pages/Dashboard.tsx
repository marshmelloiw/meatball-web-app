import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Coins,
  Calendar,
  Activity,
  Star,
  Gift,
  Target,
  PlayCircle,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePoints } from '../contexts/PointsContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { points, isWatching } = usePoints();

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Günaydın';
    if (currentHour < 18) return 'İyi günler';
    return 'İyi akşamlar';
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}s ${minutes}d`;
  };

  const userLevel = Math.floor(points.totalPoints / 1000) + 1;
  const progressToNextLevel = ((points.totalPoints % 1000) / 1000) * 100;

  // Mock data for charts and activity
  const weeklyStats = [
    { day: 'Pzt', points: 120, time: 45 },
    { day: 'Sal', points: 95, time: 32 },
    { day: 'Çar', points: 150, time: 68 },
    { day: 'Per', points: 89, time: 28 },
    { day: 'Cum', points: 200, time: 89 },
    { day: 'Cmt', points: 175, time: 76 },
    { day: 'Paz', points: 110, time: 42 }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'points',
      description: 'Valorant yayını izleyerek 45 puan kazandın',
      time: '2 saat önce',
      points: 45
    },
    {
      id: 2,
      type: 'purchase',
      description: 'VIP Rozet satın aldın',
      time: '1 gün önce',
      points: -500
    },
    {
      id: 3,
      type: 'bonus',
      description: 'Günlük bonus puan kazandın',
      time: '1 gün önce',
      points: 100
    },
    {
      id: 4,
      type: 'achievement',
      description: 'İlk Adım başarımını tamamladın',
      time: '2 gün önce',
      points: 50
    }
  ];

  const todaysGoals = [
    {
      id: 1,
      title: '2 saat yayın izle',
      progress: (points.watchingTime % 86400) / 7200 * 100, // Today's watch time out of 2 hours
      completed: (points.watchingTime % 86400) >= 7200,
      reward: 50
    },
    {
      id: 2,
      title: '100 puan kazan',
      progress: (points.weeklyPoints % 100) > 0 ? 100 : 0,
      completed: (points.weeklyPoints % 100) === 0 && points.weeklyPoints > 0,
      reward: 25
    },
    {
      id: 3,
      title: 'Sohbete katıl',
      progress: 100,
      completed: true,
      reward: 10
    }
  ];

  const favoriteCategories = [
    { name: 'Valorant', percentage: 40, color: 'bg-red-500' },
    { name: 'Just Chatting', percentage: 25, color: 'bg-blue-500' },
    { name: 'League of Legends', percentage: 20, color: 'bg-yellow-500' },
    { name: 'Minecraft', percentage: 15, color: 'bg-green-500' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'points':
        return <Coins className="w-4 h-4 text-kick-gold" />;
      case 'purchase':
        return <Gift className="w-4 h-4 text-kick-accent" />;
      case 'bonus':
        return <Star className="w-4 h-4 text-yellow-400" />;
      case 'achievement':
        return <Award className="w-4 h-4 text-kick-primary" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const maxPoints = Math.max(...weeklyStats.map(s => s.points));
  const maxTime = Math.max(...weeklyStats.map(s => s.time));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-gaming mb-2">
            {getGreeting()}, {user?.username}! 👋
          </h1>
          <p className="text-gray-400">
            Hesap aktiviteni ve istatistiklerini burada takip edebilirsin
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-kick-primary/20 to-kick-secondary/20 border-kick-primary/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-kick-primary rounded-lg flex items-center justify-center">
                <Coins size={20} className="text-kick-dark" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Toplam Puan</p>
                <p className="text-xl font-bold text-kick-gold points-glow">
                  {Math.floor(points.totalPoints).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">İzleme Süresi</p>
                <p className="text-xl font-bold text-white">
                  {formatTime(points.watchingTime)}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Star size={20} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Seviye</p>
                <p className="text-xl font-bold text-white">{userLevel}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isWatching ? 'bg-green-500' : 'bg-gray-500'
              }`}>
                <PlayCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Durum</p>
                <p className="text-xl font-bold text-white">
                  {isWatching ? 'İzliyor' : 'Çevrimdışı'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Seviye İlerlemesi</h3>
                <span className="text-kick-primary font-semibold">Seviye {userLevel}</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Seviye {userLevel}</span>
                  <span>Seviye {userLevel + 1}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-kick-primary to-kick-secondary h-3 rounded-full transition-all duration-500 glow"
                    style={{ width: `${progressToNextLevel}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white">{Math.floor(points.totalPoints % 1000)}/1000 XP</span>
                  <span className="text-gray-400">{Math.floor(1000 - (points.totalPoints % 1000))} XP kaldı</span>
                </div>
              </div>
            </div>

            {/* Weekly Stats Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Haftalık İstatistikler</h3>
                <BarChart3 className="w-6 h-6 text-kick-primary" />
              </div>
              
              <div className="space-y-6">
                {/* Points Chart */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Kazanılan Puanlar</h4>
                  <div className="flex items-end space-x-2 h-32">
                    {weeklyStats.map((stat, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gray-700 rounded-t relative" style={{ height: '100px' }}>
                          <div 
                            className="bg-gradient-to-t from-kick-primary to-kick-secondary rounded-t transition-all duration-500"
                            style={{ 
                              height: `${(stat.points / maxPoints) * 100}%`,
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 mt-2">{stat.day}</span>
                        <span className="text-xs text-white font-semibold">{stat.points}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Chart */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">İzleme Süresi (dakika)</h4>
                  <div className="flex items-end space-x-2 h-24">
                    {weeklyStats.map((stat, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gray-700 rounded-t relative" style={{ height: '60px' }}>
                          <div 
                            className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-500"
                            style={{ 
                              height: `${(stat.time / maxTime) * 100}%`,
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 mt-2">{stat.day}</span>
                        <span className="text-xs text-white font-semibold">{stat.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Favorite Categories */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-6">Favori Kategoriler</h3>
              <div className="space-y-4">
                {favoriteCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">{category.name}</span>
                      <span className="text-white font-semibold">%{category.percentage}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Today's Goals */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Target className="w-5 h-5 text-kick-primary" />
                <span>Günlük Hedefler</span>
              </h3>
              <div className="space-y-4">
                {todaysGoals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${goal.completed ? 'text-kick-primary' : 'text-gray-300'}`}>
                        {goal.title}
                      </span>
                      {goal.completed && <Star className="w-4 h-4 text-kick-gold fill-current" />}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          goal.completed ? 'bg-kick-primary' : 'bg-gray-500'
                        }`}
                        style={{ width: `${Math.min(goal.progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">
                        {Math.floor(goal.progress)}% tamamlandı
                      </span>
                      <div className="flex items-center space-x-1">
                        <Coins className="w-3 h-3 text-kick-gold" />
                        <span className="text-kick-gold">+{goal.reward}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-kick-primary" />
                <span>Son Aktiviteler</span>
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm">{activity.description}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                    {activity.points !== 0 && (
                      <div className={`flex items-center space-x-1 ${
                        activity.points > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <span className="text-xs font-semibold">
                          {activity.points > 0 ? '+' : ''}{activity.points}
                        </span>
                        <Coins className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-6">Hızlı İşlemler</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <PlayCircle className="w-4 h-4" />
                  <span>Yayın İzlemeye Başla</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span>Mağazaya Git</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Detaylı İstatistikler</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;