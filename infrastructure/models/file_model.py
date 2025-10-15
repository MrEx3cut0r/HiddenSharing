from datetime import datetime

from pydantic import BaseModel, ConfigDict
from fastapi import File

class FileModel(BaseModel):
	model_config = ConfigDict(arbitrary_types_allowed=True)
	file: File
	uploaded_at: datetime
	expires_at: datetime