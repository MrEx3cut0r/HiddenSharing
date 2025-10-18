'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomeClient() {
  const [token, setToken] = useState('');

  const handleDownloadClick = () => {
    if (token.trim()) {
      window.location.href = `/download/${token.trim()}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDownloadClick();
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Link href="/upload" className="button">
        Upload File
      </Link>
      <span style={{ margin: '0 15px', color: '#666' }}>or</span>
      <input 
        type="text" 
        placeholder="Enter file token" 
        className="input" 
        style={{ width: '200px', display: 'inline-block' }}
        value={token}
        onChange={(e) => setToken(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button 
        className="button button-secondary" 
        style={{ marginLeft: '10px' }}
        onClick={handleDownloadClick}
        disabled={!token.trim()}
      >
        Download
      </button>
    </div>
  );
}
