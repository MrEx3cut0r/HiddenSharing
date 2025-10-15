from typing import Optional
import pickle

from redis.asyncio import Redis
from secrets import token_hex

from infrastructure.models.file_model import FileModel
from infrastructure.models.uploaded_model import UploadedModel 
from infrastructure.dependencies.model_filler import fillUploadedModel

class CachingRepository():
	def __init__(self) -> None:
		self.r = Redis(host='0.0.0.0', port='6379')

	async def add(self, file_model: FileModel) -> UploadedModel:
		pickled = pickle.dumps(file_model)
		uploaded = fillUploadedModel()
		print(uploaded)
		await self.r.set(uploaded.token, pickled)
		await self.r.expire(uploaded.token, 86400)
		return uploaded

	async def get(self, token: str) -> Optional[FileModel]:
		pickled = await self.r.get(token)
		return pickle.loads(pickled) if pickled else None

	async def delete(self, token: str) -> None:
		await self.r.delete(token)

def getCachingRepository() -> CachingRepository:
	return CachingRepository()