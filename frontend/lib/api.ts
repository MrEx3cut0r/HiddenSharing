const API_BASE_URL = 'http://localhost:80';

export const fileAPI = {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/file/upload-file`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  async downloadFile(token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/file/download-file?token=${token}`);

      // Проверяем статус ответа
      if (response.status === 404) {
        return { success: false, error: 'File not found' };
      }

      if (!response.ok) {
        return { success: false, error: `Server error: ${response.status}` };
      }

      // Получаем Content-Type для определения типа ответа
      const contentType = response.headers.get('content-type') || '';

      // Если это JSON, проверяем не возвращает ли бэкенд ошибку в JSON
      if (contentType.includes('application/json')) {
        const jsonData = await response.json();
        
        // Если бэкенд возвращает null
        if (jsonData === null) {
          return { success: false, error: 'File not available' };
        }
        
        // Если бэкенд возвращает объект с ошибкой
        if (jsonData.error || jsonData.detail) {
          return { 
            success: false, 
            error: jsonData.detail || jsonData.error || 'Download failed' 
          };
        }
        
        // Если это не ошибка, но JSON - возможно бэкенд возвращает информацию о файле
        // В этом случае продолжаем скачивание
      }

      // Скачиваем файл
      const blob = await response.blob();
      
      // Проверяем что файл не пустой
      if (blob.size === 0) {
        return { success: false, error: 'File is empty' };
      }

      // Создаем ссылку для скачивания
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Получаем имя файла из headers
      let filename = `file-${token}`;
      const contentDisposition = response.headers.get('content-disposition');
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match?.[1]) filename = match[1];
      }
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      return { success: true, filename };
    } catch (error) {
      console.error('Download error:', error);
      return { 
        success: false, 
        error: 'Network error - check if backend is running' 
      };
    }
  },

  async checkFileExists(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/file/download-file?token=${token}`, {
        method: 'GET', // Используем GET вместо HEAD
      });
      
      return response.ok;
    } catch (error) {
      console.error('Check file exists error:', error);
      return false;
    }
  }
};
