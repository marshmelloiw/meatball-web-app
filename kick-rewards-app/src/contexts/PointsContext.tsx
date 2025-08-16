import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface PointsData {
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  pointsHistory: PointsTransaction[];
  watchingTime: number;
  multiplier: number;
}

interface PointsTransaction {
  id: string;
  type: 'earned' | 'spent' | 'bonus';
  amount: number;
  reason: string;
  timestamp: Date;
}

interface PointsContextType {
  points: PointsData;
  isWatching: boolean;
  startWatching: () => void;
  stopWatching: () => void;
  spendPoints: (amount: number, reason: string) => boolean;
  addBonusPoints: (amount: number, reason: string) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsProvider: React.FC<PointsProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [points, setPoints] = useState<PointsData>({
    totalPoints: 0,
    weeklyPoints: 0,
    monthlyPoints: 0,
    pointsHistory: [],
    watchingTime: 0,
    multiplier: 1.0
  });
  const [isWatching, setIsWatching] = useState(false);
  const [watchInterval, setWatchInterval] = useState<NodeJS.Timeout | null>(null);

  // Load points data from localStorage
  useEffect(() => {
    if (user) {
      const storedPoints = localStorage.getItem(`kick_points_${user.id}`);
      if (storedPoints) {
        const pointsData = JSON.parse(storedPoints);
        // Convert timestamp strings back to Date objects
        pointsData.pointsHistory = pointsData.pointsHistory.map((tx: any) => ({
          ...tx,
          timestamp: new Date(tx.timestamp)
        }));
        setPoints(pointsData);
      }
    }
  }, [user]);

  // Save points data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`kick_points_${user.id}`, JSON.stringify(points));
    }
  }, [points, user]);

  const addTransaction = (type: 'earned' | 'spent' | 'bonus', amount: number, reason: string) => {
    const transaction: PointsTransaction = {
      id: Date.now().toString(),
      type,
      amount,
      reason,
      timestamp: new Date()
    };

    setPoints(prev => ({
      ...prev,
      pointsHistory: [transaction, ...prev.pointsHistory].slice(0, 100) // Keep last 100 transactions
    }));
  };

  const startWatching = () => {
    if (!isAuthenticated || isWatching) return;

    setIsWatching(true);
    const interval = setInterval(() => {
      const pointsEarned = Math.floor(Math.random() * 5) + 1; // 1-5 points per interval
      const bonusChance = Math.random();
      
      setPoints(prev => {
        const newPoints = {
          ...prev,
          totalPoints: prev.totalPoints + pointsEarned * prev.multiplier,
          weeklyPoints: prev.weeklyPoints + pointsEarned * prev.multiplier,
          monthlyPoints: prev.monthlyPoints + pointsEarned * prev.multiplier,
          watchingTime: prev.watchingTime + 30
        };
        return newPoints;
      });

      addTransaction('earned', pointsEarned, 'Watching stream');

      // Random bonus points (5% chance)
      if (bonusChance < 0.05) {
        const bonusAmount = Math.floor(Math.random() * 50) + 10;
        setPoints(prev => ({
          ...prev,
          totalPoints: prev.totalPoints + bonusAmount
        }));
        addTransaction('bonus', bonusAmount, 'Random bonus!');
      }
    }, 30000); // Every 30 seconds

    setWatchInterval(interval);
  };

  const stopWatching = () => {
    setIsWatching(false);
    if (watchInterval) {
      clearInterval(watchInterval);
      setWatchInterval(null);
    }
  };

  const spendPoints = (amount: number, reason: string): boolean => {
    if (points.totalPoints >= amount) {
      setPoints(prev => ({
        ...prev,
        totalPoints: prev.totalPoints - amount
      }));
      addTransaction('spent', amount, reason);
      return true;
    }
    return false;
  };

  const addBonusPoints = (amount: number, reason: string) => {
    setPoints(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + amount
    }));
    addTransaction('bonus', amount, reason);
  };

  const value: PointsContextType = {
    points,
    isWatching,
    startWatching,
    stopWatching,
    spendPoints,
    addBonusPoints
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
};