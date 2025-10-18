from fastapi import FastAPI
import uvicorn

from presentation.v1.api.file_controller import router as file_router

def app() -> FastAPI:
	api = FastAPI(root_path='/api/v1')
	api.include_router(file_router)
	return api

Api = app()
if __name__=="__main__":
	uvicorn.run("main:Api", host='0.0.0.0', port='8080')