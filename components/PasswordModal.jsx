import React, { useState } from 'react';

const PasswordModal = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit(password)) {
      setError('Incorrect password');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4 text-center">Secure Access</h2>
        <p className="mb-6 text-slate-300 text-center">Enter password to view tickets</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-400 text-center">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-200"
          >
            Access Tickets
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;