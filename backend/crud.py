from sqlalchemy.orm import Session
import models, schemas
from ml_service import get_text_embedding, get_image_embedding, compute_similarity

def create_lost_item(db: Session, item: schemas.LostItemCreate, image_path: str):
    # Generate embeddings
    text_emb = get_text_embedding(item.description) # Using description for text match
    img_emb = get_image_embedding(image_path)
    
    db_item = models.LostItem(
        name=item.name,
        description=item.description,
        contact_pref=item.contact_pref,
        contact_detail=item.contact_detail,
        image_url=image_path,
        text_embedding=text_emb,
        image_embedding=img_emb
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_found_item(db: Session, item: schemas.FoundItemCreate, image_path: str):
    text_emb = get_text_embedding(item.description)
    img_emb = get_image_embedding(image_path)
    
    db_item = models.FoundItem(
        description=item.description,
        found_location=item.found_location,
        image_url=image_path,
        text_embedding=text_emb,
        image_embedding=img_emb
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_matches_for_lost_item(db: Session, lost_item_id: int):
    lost_item = db.query(models.LostItem).filter(models.LostItem.id == lost_item_id).first()
    if not lost_item:
        return []
    
    found_items = db.query(models.FoundItem).all()
    results = []
    
    for found in found_items:
        # Combined score: 0.7 image + 0.3 text (as per user/MVP logic)
        img_sim = compute_similarity(lost_item.image_embedding, found.image_embedding)
        text_sim = compute_similarity(lost_item.text_embedding, found.text_embedding)
        final_score = 0.7 * img_sim + 0.3 * text_sim
        
        if final_score > 0.4: # Threshold
            results.append({"found_item": found, "score": final_score})
            
    results.sort(key=lambda x: x["score"], reverse=True)
    return results

def get_all_found_items(db: Session):
    return db.query(models.FoundItem).order_by(models.FoundItem.id.desc()).all()
