import './globals.css';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'File Share',
  description: 'Secure file sharing service',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="header">
            <h1 className="title">File Share</h1>
            <div className="subtitle">
              Secure and simple file sharing
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
