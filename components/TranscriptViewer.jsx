import React, { useState, useEffect } from 'react';

const TranscriptViewer = ({ currentTranscript, onTranscriptChange }) => {
  const [transcriptData, setTranscriptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTranscript(currentTranscript);
  }, [currentTranscript]);

  const loadTranscript = async (transcriptName) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll simulate with sample data
      const sampleData = generateSampleTranscript(transcriptName);
      setTranscriptData(sampleData);
    } catch (err) {
      setError('Failed to load transcript');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleTranscript = (name) => {
    // This is sample data - in a real app, you would fetch actual transcript data
    const messages = [
      {
        id: 1,
        user: { id: '123456789', username: 'AdminUser', avatar: null },
        timestamp: '2023-05-15T14:30:00Z',
        content: 'Hello, welcome to our support system. How can I help you today?'
      },
      {
        id: 2,
        user: { id: '987654321', username: 'ClientUser', avatar: null },
        timestamp: '2023-05-15T14:32:15Z',
        content: 'Hi, I\'m having trouble accessing my account.'
      },
      {
        id: 3,
        user: { id: '123456789', username: 'AdminUser', avatar: null },
        timestamp: '2023-05-15T14:33:45Z',
        content: 'I can help with that. Could you please provide your account email?'
      },
      {
        id: 4,
        user: { id: '987654321', username: 'ClientUser', avatar: null },
        timestamp: '2023-05-15T14:35:22Z',
        content: 'Sure, it\'s client@example.com'
      }
    ];

    return {
      id: name,
      title: `${name.replace('transcript', 'Ticket ')} - Account Access Issue`,
      openedAt: '2023-05-15T14:30:00Z',
      closedAt: null,
      messages: messages
    };
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getInitials = (username) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Ticket Viewer</h1>
        <p className="text-slate-400">Secure access to support transcripts</p>
      </header>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => onTranscriptChange('transcript1')}
          className={`px-4 py-2 rounded-lg transition ${
            currentTranscript === 'transcript1'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Ticket 1
        </button>
        <button
          onClick={() => onTranscriptChange('transcript2')}
          className={`px-4 py-2 rounded-lg transition ${
            currentTranscript === 'transcript2'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Ticket 2
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p>Loading transcript...</p>
        </div>
      ) : error ? (
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-red-300 mb-2">Error</h3>
          <p className="text-red-200">{error}</p>
        </div>
      ) : transcriptData ? (
        <div className="transcript-container">
          <div className="mb-6 pb-4 border-b border-slate-600">
            <h2 className="text-2xl font-bold">{transcriptData.title}</h2>
            <p className="text-slate-400">
              Opened: {formatTimestamp(transcriptData.openedAt)}
            </p>
          </div>

          <div className="space-y-4">
            {transcriptData.messages.map((message) => (
              <div key={message.id} className="message">
                <div className="message-header">
                  <div className="avatar">
                    {getInitials(message.user.username)}
                  </div>
                  <span className="username">{message.user.username}</span>
                  <span className="timestamp">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                <div className="content">
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p>No transcript data available</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptViewer;