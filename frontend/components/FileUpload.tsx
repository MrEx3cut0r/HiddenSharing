'use client';

import { useState, DragEvent } from 'react';
import { fileAPI } from '../lib/api';
import { UploadResponse } from '../types/api';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [dragOver, setDragOver] = useState<boolean>(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setResult(null);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError('');
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');
    setResult(null);

    try {
      const response = await fileAPI.uploadFile(file);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card">
      <h2>Upload File</h2>
      <div className="info">Select a file to share securely</div>
      
      <div 
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileSelect}
          className="input"
          disabled={uploading}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📁</div>
          <div className="info">
            {file ? file.name : 'Click to select or drag and drop a file'}
          </div>
          <div className="info" style={{ fontSize: '0.8rem', color: '#999' }}>
            Max file size: 100MB
          </div>
        </label>
      </div>
      
      {file && (
        <div className="file-info">
          <strong>Selected file:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}
      
      <button 
        onClick={handleUpload} 
        className="button"
        disabled={uploading || !file}
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>

      {error && (
        <div className="message error">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="message success">
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>File uploaded successfully!</div>
          <div className="file-info">
            <div><strong>Token:</strong> {result.token}</div>
            <div><strong>Uploaded:</strong> {new Date(result.uploaded_at).toLocaleString()}</div>
            <div><strong>Expires:</strong> {new Date(result.expires_at).toLocaleString()}</div>
            <div style={{ marginTop: '10px' }}>
              <strong>Share this link:</strong>{' '}
              <a 
                href={`/download/${result.token}`}
                className="link"
              >
                {typeof window !== 'undefined' ? `${window.location.origin}/download/${result.token}` : `/download/${result.token}`}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
