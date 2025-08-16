import React from 'react';
import { 
  Coins, 
  TrendingUp, 
  Clock, 
  Gift, 
  Target, 
  Star,
  Calendar,
  ArrowUp,
  ArrowDown,
  Plus
} from 'lucide-react';
import { usePoints } from '../contexts/PointsContext';
import { useAuth } from '../contexts/AuthContext';

const Points: React.FC = () => {
  const { points } = usePoints();
  const { user } = useAuth();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}s ${minutes}d`;
  };

  const getTransactionIcon = (type: 'earned' | 'spent' | 'bonus') => {
    switch (type) {
      case 'earned':
        return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'spent':
        return <ArrowDown className="w-4 h-4 text-red-400" />;
      case 'bonus':
        return <Plus className="w-4 h-4 text-kick-gold" />;
    }
  };

  const getTransactionColor = (type: 'earned' | 'spent' | 'bonus') => {
    switch (type) {
      case 'earned':
        return 'text-green-400';
      case 'spent':
        return 'text-red-400';
      case 'bonus':
        return 'text-kick-gold';
    }
  };

  const achievements = [
    {
      id: 1,
      title: 'İlk Adım',
      description: '100 puan kazan',
      progress: Math.min(points.totalPoints / 100, 1),
      completed: points.totalPoints >= 100,
      reward: 50
    },
    {
      id: 2,
      title: 'Düzenli İzleyici',
      description: '1000 puan kazan',
      progress: Math.min(points.totalPoints / 1000, 1),
      completed: points.totalPoints >= 1000,
      reward: 200
    },
    {
      id: 3,
      title: 'Zaman Öğretmeni',
      description: '10 saat izle',
      progress: Math.min(points.watchingTime / 36000, 1),
      completed: points.watchingTime >= 36000,
      reward: 500
    },
    {
      id: 4,
      title: 'Puan Ustası',
      description: '5000 puan kazan',
      progress: Math.min(points.totalPoints / 5000, 1),
      completed: points.totalPoints >= 5000,
      reward: 1000
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-gaming mb-2">
            Puanlarım
          </h1>
          <p className="text-gray-400">
            Kazandığın puanları takip et ve harcama geçmişini gör
          </p>
        </div>

        {/* Points Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-kick-primary/20 to-kick-secondary/20 border-kick-primary/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-kick-primary rounded-xl flex items-center justify-center">
                <Coins size={24} className="text-kick-dark" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Toplam Puan</p>
                <p className="text-2xl font-bold text-kick-gold points-glow">
                  {Math.floor(points.totalPoints).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Calendar size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Bu Hafta</p>
                <p className="text-2xl font-bold text-white">
                  {Math.floor(points.weeklyPoints).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Clock size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">İzleme Süresi</p>
                <p className="text-2xl font-bold text-white">
                  {formatTime(points.watchingTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Points History */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Puan Geçmişi</h2>
                <TrendingUp className="w-6 h-6 text-kick-primary" />
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {points.pointsHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Coins className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Henüz işlem geçmişi yok</p>
                    <p className="text-gray-500 text-sm">Yayın izleyerek puan kazanmaya başla!</p>
                  </div>
                ) : (
                  points.pointsHistory.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-kick-darker rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{transaction.reason}</p>
                          <p className="text-gray-400 text-sm">{formatDate(transaction.timestamp)}</p>
                        </div>
                      </div>
                      <div className={`text-right ${getTransactionColor(transaction.type)}`}>
                        <p className="font-semibold">
                          {transaction.type === 'spent' ? '-' : '+'}
                          {transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">
                          {transaction.type === 'earned' ? 'Kazanıldı' : 
                           transaction.type === 'spent' ? 'Harcandı' : 'Bonus'}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-kick-primary" />
                <span>İstatistikler</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Çarpan</span>
                  <span className="text-white font-semibold">{points.multiplier}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bu Ay</span>
                  <span className="text-white font-semibold">
                    {Math.floor(points.monthlyPoints).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ortalama/Saat</span>
                  <span className="text-white font-semibold">
                    {points.watchingTime > 0 
                      ? Math.floor(points.totalPoints / (points.watchingTime / 3600)).toLocaleString()
                      : '0'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-kick-gold" />
                <span>Başarımlar</span>
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border ${
                      achievement.completed 
                        ? 'bg-kick-primary/10 border-kick-primary/30' 
                        : 'bg-kick-darker border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${
                        achievement.completed ? 'text-kick-primary' : 'text-white'
                      }`}>
                        {achievement.title}
                      </h4>
                      {achievement.completed && (
                        <Star className="w-4 h-4 text-kick-gold fill-current" />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          achievement.completed ? 'bg-kick-primary' : 'bg-gray-500'
                        }`}
                        style={{ width: `${achievement.progress * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {Math.floor(achievement.progress * 100)}% tamamlandı
                      </span>
                      <div className="flex items-center space-x-1">
                        <Gift className="w-3 h-3 text-kick-gold" />
                        <span className="text-xs text-kick-gold">
                          +{achievement.reward}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Hızlı İşlemler</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Coins className="w-4 h-4" />
                  <span>Mağazaya Git</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>İstatistikleri Gör</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Points;