from sqlalchemy import Column, Integer, String, JSON
from database import Base

class LostItem(Base):
    __tablename__ = "lost_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    contact_pref = Column(String) # 'phone', 'email', 'discord'
    contact_detail = Column(String)
    image_url = Column(String)
    text_embedding = Column(JSON) # Storing as JSON list for MVP
    image_embedding = Column(JSON) # Storing as JSON list for MVP

class FoundItem(Base):
    __tablename__ = "found_items"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    found_location = Column(String) # Where it was found
    contact_info = Column(String) # Contact details for the finder
    image_url = Column(String)
    text_embedding = Column(JSON)
    image_embedding = Column(JSON)
