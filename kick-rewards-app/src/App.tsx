import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PointsProvider } from './contexts/PointsContext';
import { ModerationProvider } from './contexts/ModerationContext';
import ModerationPanel from './components/ModerationPanel';
import ExtensionPopup from './components/ExtensionPopup';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Points from './pages/Points';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [view, setView] = useState<'web' | 'popup' | 'panel'>('web');

  useEffect(() => {
    // Check URL parameters to determine the view mode
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    
    if (viewParam === 'panel') {
      setView('panel');
    } else if (window.location.pathname.includes('popup.html')) {
      setView('popup');
    } else {
      setView('web');
    }
  }, []);

  // Extension popup view
  if (view === 'popup') {
    return (
      <AuthProvider>
        <PointsProvider>
          <ModerationProvider>
            <div className="app extension-mode">
              <ExtensionPopup />
            </div>
          </ModerationProvider>
        </PointsProvider>
      </AuthProvider>
    );
  }

  // Extension moderation panel view
  if (view === 'panel') {
    return (
      <AuthProvider>
        <PointsProvider>
          <ModerationProvider>
            <div className="app extension-mode">
              <ModerationPanel />
            </div>
          </ModerationProvider>
        </PointsProvider>
      </AuthProvider>
    );
  }

  // Normal web application
  return (
    <AuthProvider>
      <PointsProvider>
        <ModerationProvider>
          <Router>
            <div className="app web-mode min-h-screen bg-gradient-to-br from-meatball-background via-meatball-surface to-meatball-background">
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/points" element={<Points />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ModerationProvider>
      </PointsProvider>
    </AuthProvider>
  );
}

export default App;
