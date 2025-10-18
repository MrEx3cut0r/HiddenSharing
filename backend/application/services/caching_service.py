from domain.daos.caching_dao import getCachingDAO, CachingDAO
from infrastructure.models.file_model import FileModel
from infrastructure.models.uploaded_model import UploadedModel

class CachingService():
	def __init__(self, dao: CachingDAO) -> None:
		self.dao = dao

	async def add(self, file: FileModel) -> UploadedModel:
		return await self.dao.add(file)

	async def get(self, token: str) -> FileModel:
		return await self.dao.get(token)

	async def delete(self, token: str) -> None:
		return await self.dao.delete(token)

def getCachingService() -> CachingService:
	return CachingService(getCachingDAO())