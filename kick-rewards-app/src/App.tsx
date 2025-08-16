import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PointsProvider } from './contexts/PointsContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Points from './pages/Points';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Stream from './pages/Stream';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <PointsProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-kick-darker via-kick-dark to-kick-darker">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/points" element={<Points />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/stream/:streamId" element={<Stream />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PointsProvider>
    </AuthProvider>
  );
}

export default App;
