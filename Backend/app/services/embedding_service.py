import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

from app.services.llm_factory import get_embedding_model

def generate_embedding(text: str):
    model = get_embedding_model()
    # Model API expects text, returns list of floats
    return model.embed_query(text)