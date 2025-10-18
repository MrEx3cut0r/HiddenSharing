import Link from 'next/link';
import FileUpload from '../components/FileUpload';
import HomeClient from '../components/HomeClient';

export default function Home() {
  return (
    <div className="content">
      <div className="card">
        <h2>Welcome to File Share</h2>
        <div className="info">
          Easily share files securely. Upload your file and get a shareable link. 
          Files are automatically deleted after expiration.
        </div>
        <HomeClient />
      </div>
      
      <FileUpload />
    </div>
  );
}
