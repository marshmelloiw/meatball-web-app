import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Coins, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  ShoppingBag, 
  BarChart3,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePoints } from '../contexts/PointsContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { points } = usePoints();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const formatPoints = (pts: number) => {
    if (pts >= 1000) {
      return `${(pts / 1000).toFixed(1)}K`;
    }
    return Math.floor(pts).toString();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-meatball-surface/95 backdrop-blur-sm border-b border-meatball-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-meatball-primary to-meatball-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold gradient-text font-display">
              Köfte
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-300 hover:text-meatball-primary transition-colors"
            >
              <Home size={18} />
              <span>Ana Sayfa</span>
            </Link>
            
            <Link 
              to="/points" 
              className="flex items-center space-x-1 text-gray-300 hover:text-meatball-primary transition-colors"
            >
              <Coins size={18} />
              <span>Puanlarım</span>
            </Link>
            
            <Link 
              to="/shop" 
              className="flex items-center space-x-1 text-gray-300 hover:text-meatball-primary transition-colors"
            >
              <ShoppingBag size={18} />
              <span>Mağaza</span>
            </Link>
            
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-1 text-gray-300 hover:text-meatball-primary transition-colors"
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Points Display */}
                <div className="hidden sm:flex items-center space-x-2 bg-meatball-background/50 px-3 py-1 rounded-full border border-meatball-border">
                  <Coins size={16} className="text-meatball-primary" />
                  <span className="text-meatball-primary font-semibold points-glow">
                    {formatPoints(points.totalPoints)}
                  </span>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-meatball-primary to-meatball-secondary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.username?.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block">{user?.username}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-meatball-surface border border-meatball-border rounded-lg shadow-meatball-lg py-1">
                      <div className="px-4 py-2 border-b border-meatball-border">
                        <p className="text-sm font-medium text-white">{user?.username}</p>
                        <div className="flex items-center space-x-1 text-xs text-meatball-primary">
                          <Coins size={12} />
                          <span>{formatPoints(points.totalPoints)} puan</span>
                        </div>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-meatball-border transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} />
                        <span>Profil</span>
                      </Link>
                      
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-meatball-border transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Ayarlar</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-meatball-border transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-meatball-border">
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-meatball-border rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                <span>Ana Sayfa</span>
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link
                    to="/points"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-meatball-border rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Coins size={18} />
                    <span>Puanlarım</span>
                  </Link>
                  
                  <Link
                    to="/shop"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-meatball-border rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag size={18} />
                    <span>Mağaza</span>
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-meatball-border rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 size={18} />
                    <span>Dashboard</span>
                  </Link>

                  {/* Mobile Points Display */}
                  <div className="flex items-center justify-between px-3 py-2 bg-meatball-background/50 rounded-lg border border-meatball-border">
                    <span className="text-gray-300">Toplam Puan</span>
                    <div className="flex items-center space-x-1">
                      <Coins size={16} className="text-meatball-primary" />
                      <span className="text-meatball-primary font-semibold points-glow">
                        {formatPoints(points.totalPoints)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {!isAuthenticated && (
                <div className="space-y-2 pt-2">
                  <Link
                    to="/login"
                    className="block w-full text-center px-3 py-2 text-gray-300 hover:text-white hover:bg-meatball-border rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;