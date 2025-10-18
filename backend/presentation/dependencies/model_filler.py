from datetime import datetime, timedelta

from fastapi import File
from secrets import token_hex

from presentation.models.uploaded_model import UploadedModel

def fillUploadedModel() -> UploadedModel:
	return UploadedModel(
		token=token_hex(24),
		uploaded_at=datetime.now(),
		expires_at=datetime.now()+timedelta(days=1)
	)
def file_iterator(file_object):
	while chunk := file_object.read(8192):
		yield chunk