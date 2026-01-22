from sentence_transformers import SentenceTransformer
from PIL import Image
import numpy as np

# Load models globally to avoid reloading (lazy loading can be better but this is MVP)
print("Loading Text Model...")
text_model = SentenceTransformer('all-MiniLM-L6-v2')
print("Loading Image Model...")
img_model = SentenceTransformer('clip-ViT-B-32')

def get_text_embedding(text: str) -> list:
    return text_model.encode(text).tolist()

def get_image_embedding(image_path: str) -> list:
    image = Image.open(image_path)
    return img_model.encode(image).tolist()

def compute_similarity(embedding1, embedding2):
    # Cosine similarity
    vec1 = np.array(embedding1)
    vec2 = np.array(embedding2)
    return float(np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2)))
