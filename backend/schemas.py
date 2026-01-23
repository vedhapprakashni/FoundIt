from pydantic import BaseModel
from typing import Optional, List

class LostItemBase(BaseModel):
    name: str
    description: str
    contact_pref: str
    contact_detail: str

class LostItemCreate(LostItemBase):
    pass

class LostItem(LostItemBase):
    id: int
    image_url: str
    
    class Config:
        orm_mode = True

class FoundItemBase(BaseModel):
    description: str
    found_location: str
    contact_info: str

class FoundItemCreate(FoundItemBase):
    pass

class FoundItem(FoundItemBase):
    id: int
    image_url: str

    class Config:
        orm_mode = True

class MatchResult(BaseModel):
    found_item: FoundItem
    score: float
