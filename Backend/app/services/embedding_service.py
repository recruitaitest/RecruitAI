import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

# Initialize Gemini Embeddings lazily
_model = None

def get_model():
    global _model
    if _model is None:
        from langchain_google_genai import GoogleGenerativeAIEmbeddings
        _model = GoogleGenerativeAIEmbeddings(
            model="models/gemini-embedding-2",
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )
    return _model

def generate_embedding(text: str):
    model = get_model()
    # Gemini API expects text, returns list of floats
    return model.embed_query(text)