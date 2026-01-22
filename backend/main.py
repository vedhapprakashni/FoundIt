from fastapi import FastAPI, Depends, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import shutil
import os
import uuid

from database import engine, get_db, Base
import models, schemas, crud

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FoundIt API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for MVP dev, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Mount uploads directory to serve images
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.post("/lost", response_model=schemas.LostItem)
async def create_lost_item(
    name: str = Form(...),
    description: str = Form(...),
    contact_pref: str = Form(...),
    contact_detail: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save image
    file_extension = image.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_extension}"
    file_path = f"uploads/{file_name}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
        
    # Create item
    item_data = schemas.LostItemCreate(
        name=name,
        description=description,
        contact_pref=contact_pref,
        contact_detail=contact_detail
    )
    return crud.create_lost_item(db, item_data, file_path)

@app.post("/found", response_model=schemas.FoundItem)
async def create_found_item(
    description: str = Form(...),
    found_location: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_extension = image.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_extension}"
    file_path = f"uploads/{file_name}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
        
    item_data = schemas.FoundItemCreate(
        description=description,
        found_location=found_location
    )
    return crud.create_found_item(db, item_data, file_path)

from typing import List

@app.get("/matches/{lost_id}", response_model=List[schemas.MatchResult])
def get_matches(lost_id: int, db: Session = Depends(get_db)):
    return crud.get_matches_for_lost_item(db, lost_id)

@app.get("/found", response_model=List[schemas.FoundItem])
def get_found_items(db: Session = Depends(get_db)):
    return crud.get_all_found_items(db)
