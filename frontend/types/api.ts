export interface UploadResponse {
  token: string;
  uploaded_at: string;
  expires_at: string;
}

export interface DownloadResponse {
  success: boolean;
  filename?: string;
  error?: string;
}

export interface FileInfo {
  token: string;
  filename: string;
  size: number;
  uploaded_at: string;
  expires_at: string;
}
