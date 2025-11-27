import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ticketContent, setTicketContent] = useState('');
  const [ticketName, setTicketName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(true);

  // Check if user is already authenticated (via localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem('ticketViewerAuth');
    const authTime = localStorage.getItem('ticketViewerAuthTime');
    
    if (authStatus === 'true' && authTime) {
      const currentTime = new Date().getTime();
      const storedTime = parseInt(authTime);
      // Check if authentication is still valid (24 hours = 86400000 ms)
      if (currentTime - storedTime < 86400000) {
        setIsAuthenticated(true);
        setShowPasswordInput(false);
        loadTranscript();
        return;
      }
    }
    
    // If not authenticated or expired, show password input
    setShowPasswordInput(true);
    setLoading(false);
  }, []);

  // Get ticket name from URL parameter
  const getTicketFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    // Try to get ticket parameter first
    let ticket = urlParams.get('ticket');
    // If not found, check if there's a parameter without a name (like ?transcript)
    if (!ticket) {
      // Get the first parameter value if it exists
      const entries = urlParams.entries();
      const firstEntry = entries.next();
      if (!firstEntry.done) {
        // If there's a parameter without a value, use the parameter name
        if (firstEntry.value[1] === '') {
          ticket = firstEntry.value[0];
        }
      }
    }
    // If still no ticket, try to load default transcript
    if (!ticket) {
      ticket = 'transcript';
    }
    return ticket;
  };

  // Load transcript based on ticket name
  const loadTranscript = (ticketName = null) => {
    // If not authenticated, don't load anything
    if (!isAuthenticated) return;

    // If no ticket name provided, try to get from URL
    if (!ticketName) {
      ticketName = getTicketFromURL();
    }

    setTicketName(ticketName);
    setLoading(true);
    setError(null);

    // Construct path to ticket file
    const paths = [
      `/ticket/${ticketName}.html`,
      `./ticket/${ticketName}.html`,
      `ticket/${ticketName}.html`
    ];

    const tryPath = (index) => {
      if (index >= paths.length) {
        setError(`Could not load ticket file: ${ticketName}.html. Tried the following paths: ${paths.join(', ')}. Please ensure the ticket file exists in the ticket/ directory.`);
        setLoading(false);
        return;
      }

      fetch(paths[index])
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response.text();
        })
        .then(data => {
          setTicketContent(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error loading transcript from ${paths[index]}:`, error);
          // Try the next path
          tryPath(index + 1);
        });
    };

    // Start with the first path
    tryPath(0);
  };

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'kubcas3xbmw') {
      // Set authentication status and store in localStorage with timestamp
      setIsAuthenticated(true);
      setShowPasswordInput(false);
      localStorage.setItem('ticketViewerAuth', 'true');
      localStorage.setItem('ticketViewerAuthTime', new Date().getTime().toString());
      loadTranscript();
    } else {
      // Redirect to fivesense.re if password is wrong
      window.location.href = 'https://fivesense.re/';
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowPasswordInput(true);
    localStorage.removeItem('ticketViewerAuth');
    localStorage.removeItem('ticketViewerAuthTime');
    setTicketContent('');
    setTicketName('');
  };

  // Refresh handler
  const handleRefresh = () => {
    loadTranscript(ticketName);
  };

  // If showing password input
  if (showPasswordInput) {
    return (
      <div className="container">
        <header>
          <div className="logo">
            <div className="logo-icon">
              <i className="fas fa-ticket-alt"></i>
            </div>
            <h1>FiveSense Ticket Viewer</h1>
          </div>
          <p className="subtitle">Protected ticket viewer - Authentication required</p>
        </header>
        
        <div className="viewer-container">
          <div className="viewer-header">
            <div className="viewer-title">
              <i className="fas fa-lock"></i>
              <span>Authentication Required</span>
            </div>
          </div>
          
          <div id="transcript-container">
            <div className="loading">
              <div className="lock-icon">
                <i className="fas fa-lock" style={{fontSize: '3rem', marginBottom: '20px', color: '#7289da'}}></i>
              </div>
              <h3>Enter Password to Access Tickets</h3>
              <form onSubmit={handlePasswordSubmit} style={{marginTop: '20px', width: '100%', maxWidth: '400px'}}>
                <div style={{display: 'flex', gap: '10px'}}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    style={{
                      flex: 1,
                      padding: '12px 15px',
                      borderRadius: '6px',
                      border: '1px solid #40444b',
                      background: '#2f3136',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                  <button type="submit" className="btn">
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </form>
              <p style={{marginTop: '20px', color: '#b9bbbe', fontSize: '0.9rem'}}>
                Contact administrator for access credentials
              </p>
            </div>
          </div>
        </div>
        
        <footer>
          <p>FiveSense Ticket Viewer &copy; 2025 | Designed for Discord Transcript Viewing</p>
        </footer>
      </div>
    );
  }

  // Main app content (when authenticated)
  return (
    <div className="container">
      <header>
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-ticket-alt"></i>
          </div>
          <h1>FiveSense Ticket Viewer</h1>
        </div>
        <p className="subtitle">View and manage your Discord ticket transcripts with our modern interface</p>
      </header>
      
      <div className="viewer-container">
        <div className="viewer-header">
          <div className="viewer-title">
            <i className="fas fa-comments"></i>
            <span>Ticket Transcript</span>
            <div className="ticket-info">
              <i className="fas fa-file-alt"></i>
              <span>{ticketName || 'No ticket specified'}</span>
            </div>
          </div>
          <div className="controls">
            <button className="btn btn-outline" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
            <button className="btn btn-outline" onClick={handleRefresh}>
              <i className="fas fa-sync-alt"></i>
              Refresh
            </button>
          </div>
        </div>
        
        <div id="transcript-container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <h3>Loading Ticket Transcript</h3>
              {ticketName ? (
                <p>Loading ticket: {ticketName}</p>
              ) : (
                <div style={{textAlign: 'center'}}>
                  <p>Loading default transcript...</p>
                </div>
              )}
            </div>
          ) : error ? (
            <div className="error">
              <h3><i className="fas fa-exclamation-triangle"></i> Error Loading Transcript</h3>
              <p>{error}</p>
              <p style={{marginTop: '15px', fontSize: '0.9rem'}}>
                Make sure the ticket file exists in the <code>/ticket</code> directory and is accessible.
              </p>
              <p style={{marginTop: '10px', fontSize: '0.9rem'}}>
                Current URL: {window.location.href}
              </p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: ticketContent }} />
          )}
        </div>
      </div>
      
      <footer>
        <p>FiveSense Ticket Viewer &copy; 2025 | Designed for Discord Transcript Viewing</p>
      </footer>
    </div>
  );
}

export default App;