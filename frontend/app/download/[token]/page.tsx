import Link from 'next/link';
import FileDownload from '../../../components/FileDownload';

interface DownloadPageProps {
  params: {
    token: string;
  };
}

export default function DownloadPage({ params }: DownloadPageProps) {
  const { token } = params;

  return (
    <div className="content">
      <div className="navigation">
        <Link href="/" className="link">← Back to main page</Link>
      </div>
      <FileDownload token={token} />
    </div>
  );
}
