import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

load_dotenv()

client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

# Delete existing collection if present (model dimension changed: 384 → 768)
collections = [c.name for c in client.get_collections().collections]
if "candidates" in collections:
    client.delete_collection("candidates")
    print("Deleted old 'candidates' collection (384-dim)")

# Dynamically get the embedding size
from app.services.embedding_service import generate_embedding
test_vector = generate_embedding("test")
vector_size = len(test_vector)

client.create_collection(
    collection_name="candidates",
    vectors_config=VectorParams(
        size=vector_size,
        distance=Distance.COSINE
    )
)

print(f"Collection 'candidates' created successfully ({vector_size}-dim, COSINE)")