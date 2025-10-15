from datetime import datetime, timedelta

from fastapi import File
from secrets import token_hex

from infrastructure.models.file_model import FileModel
from infrastructure.models.uploaded_model import UploadedModel

def fillFileModel(file: File) -> FileModel:
	return FileModel(
		file=file,
		uploaded_at=datetime.now(),
		expires_at=datetime.now()+timedelta(days=1)
	)

def fillUploadedModel() -> UploadedModel:
	return UploadedModel(
		token=token_hex(24),
		uploaded_at=datetime.now(),
		expires_at=datetime.now()+timedelta(days=1)
	)