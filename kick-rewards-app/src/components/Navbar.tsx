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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-kick-dark/95 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-kick-primary rounded-lg flex items-center justify-center">
              <span className="text-kick-dark font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold text-kick-primary font-gaming">
              KickRewards
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-300 hover:text-kick-primary transition-colors"
            >
              <Home size={18} />
              <span>Ana Sayfa</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/points" 
                  className="flex items-center space-x-1 text-gray-300 hover:text-kick-primary transition-colors"
                >
                  <Coins size={18} />
                  <span>Puanlarım</span>
                </Link>
                <Link 
                  to="/shop" 
                  className="flex items-center space-x-1 text-gray-300 hover:text-kick-primary transition-colors"
                >
                  <ShoppingBag size={18} />
                  <span>Mağaza</span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-1 text-gray-300 hover:text-kick-primary transition-colors"
                >
                  <BarChart3 size={18} />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Points Display */}
                <div className="hidden sm:flex items-center space-x-2 bg-kick-darker px-4 py-2 rounded-lg">
                  <Coins size={20} className="text-kick-gold" />
                  <span className="text-kick-gold font-semibold points-glow">
                    {Math.floor(points.totalPoints).toLocaleString()}
                  </span>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.username}
                      className="w-8 h-8 rounded-full border-2 border-gray-600"
                    />
                    <span className="hidden sm:block">{user?.username}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-kick-dark border border-gray-600 rounded-lg shadow-xl">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={16} />
                          <span>Profil</span>
                        </Link>
                        <Link
                          to="/points"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors sm:hidden"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Coins size={16} />
                          <span>Puanlarım</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                          <LogOut size={16} />
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
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
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-300 hover:text-kick-primary hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/points"
                  className="block px-4 py-2 text-gray-300 hover:text-kick-primary hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Puanlarım
                </Link>
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-gray-300 hover:text-kick-primary hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mağaza
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:text-kick-primary hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {/* Points Display for Mobile */}
                <div className="flex items-center space-x-2 px-4 py-2">
                  <Coins size={20} className="text-kick-gold" />
                  <span className="text-kick-gold font-semibold points-glow">
                    {Math.floor(points.totalPoints).toLocaleString()} Puan
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;