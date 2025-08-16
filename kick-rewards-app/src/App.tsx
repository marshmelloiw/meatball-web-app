import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { PointsProvider } from './contexts/PointsContext';
import { ModerationProvider } from './contexts/ModerationContext';
import ModerationPanel from './components/ModerationPanel';
import ExtensionPopup from './components/ExtensionPopup';
import './types/chrome.d.ts';
import './App.css';

function App() {
  const [view, setView] = useState<'popup' | 'panel'>('popup');
  const [isExtension, setIsExtension] = useState(false);

  useEffect(() => {
    // Check if running as extension popup or injected panel
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    
    if (viewParam === 'panel') {
      setView('panel');
    } else if (window.location.pathname.includes('popup.html') || (typeof chrome !== 'undefined' && chrome.runtime)) {
      setIsExtension(true);
      setView('popup');
    }
  }, []);

  return (
    <AuthProvider>
      <PointsProvider>
        <ModerationProvider>
          <div className={`app ${isExtension ? 'extension-mode' : 'web-mode'}`}>
            {view === 'popup' ? (
              <ExtensionPopup />
            ) : (
              <ModerationPanel />
            )}
          </div>
        </ModerationProvider>
      </PointsProvider>
    </AuthProvider>
  );
}

export default App;
