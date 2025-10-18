'use client';

import { useState } from 'react';
import { fileAPI } from '../lib/api';

export default function FileDownload({ token }: { token: string }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDownload = async () => {
    setDownloading(true);
    setError('');
    setSuccess('');

    try {
      // Сначала проверяем существует ли файл
      const fileExists = await fileAPI.checkFileExists(token);
      if (!fileExists) {
        setError('File not found or expired');
        setDownloading(false);
        return;
      }

      // Затем пытаемся скачать
      const result = await fileAPI.downloadFile(token);
      
      if (result.success) {
        setSuccess(`File "${result.filename}" downloaded successfully`);
      } else {
        setError(result.error || 'Download failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Download handler error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="card">
      <h2>Download File</h2>
      <p>Token: {token}</p>
      <button 
        onClick={handleDownload} 
        disabled={downloading}
        className="button"
      >
        {downloading ? 'Downloading...' : 'Download File'}
      </button>

      {error && (
        <div className="message error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="message success">
          <strong>Success:</strong> {success}
        </div>
      )}
    </div>
  );
}
