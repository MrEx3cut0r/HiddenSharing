import Link from 'next/link';
import FileUpload from '../../components/FileUpload';

export default function UploadPage() {
  return (
    <div className="content">
      <div className="navigation">
        <Link href="/" className="link">← Back to main page</Link>
      </div>
      <FileUpload />
    </div>
  );
}
