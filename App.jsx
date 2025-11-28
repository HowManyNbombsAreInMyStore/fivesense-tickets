import React, { useState, useEffect } from 'react';
import TranscriptViewer from './components/TranscriptViewer';
import PasswordModal from './components/PasswordModal';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('transcript1');

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('fstickets_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (password) => {
    if (password === '123') {
      localStorage.setItem('fstickets_authenticated', 'true');
      setIsAuthenticated(true);
      return true;
    } else {
      // Redirect to fivesense.re if wrong password
      window.location.href = 'https://fivesense.re/';
      return false;
    }
  };

  const handleTranscriptChange = (transcript) => {
    setCurrentTranscript(transcript);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {!isAuthenticated ? (
        <PasswordModal onSubmit={handlePasswordSubmit} />
      ) : (
        <TranscriptViewer 
          currentTranscript={currentTranscript} 
          onTranscriptChange={handleTranscriptChange}
        />
      )}
    </div>
  );
}

export default App;