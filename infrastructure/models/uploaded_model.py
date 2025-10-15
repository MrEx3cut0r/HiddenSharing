from datetime import datetime

from pydantic import BaseModel

class UploadedModel(BaseModel):
	token: str
	uploaded_at: datetime
	expires_at: datetime