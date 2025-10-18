from infrastructure.repositories.caching_repository import CachingRepository, getCachingRepository
from infrastructure.models.file_model import FileModel
from infrastructure.models.uploaded_model import UploadedModel

class CachingDAO():
	def __init__(self, repository: CachingRepository) -> None:
		self.repository = repository

	async def add(self, file: FileModel) -> UploadedModel:
		return await self.repository.add(file)

	async def get(self, token: str) -> FileModel:
		return await self.repository.get(token)

	async def delete(self, token: str) -> None:
		return await self.repository.delete(file)

def getCachingDAO() -> CachingDAO:
	return CachingDAO(getCachingRepository())
