
from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import StreamingResponse

from presentation.models.uploaded_model import UploadedModel
from presentation.dependencies.downloader import file_iterator
from application.services.caching_service import getCachingService


router = APIRouter(prefix="/file")

@router.post("/upload-file")
async def upload(
		file: UploadFile,
		service: getCachingService = Depends()
	) -> UploadedModel:
	"""
	File uploading route
	"""
	uploaded = await service.add(file)
	return uploaded


@router.get("/download-file")
async def download(
		token: str,
		service: getCachingService = Depends()
	):
	"""
	File downloading route
	"""
	file = await service.get(token)
	return StreamingResponse(
		file_iterator(file.file),
		media_type=file.content_type,
		headers={"Content-Disposition": f"attachment; filename={file.filename}"}
	) if file else None