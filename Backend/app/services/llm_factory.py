import os
from dotenv import load_dotenv

load_dotenv()

# Initialize lazily to prevent massive memory usage on startup
_chat_model = None
_embedding_model = None

def get_chat_model(temperature=0.2, json_mode=False):
    # For JSON mode, we shouldn't cache the model globally because the chatbot needs non-JSON
    use_ollama = os.getenv("USE_OLLAMA", "false").lower() == "true"
    ollama_url = os.getenv("OLLAMA_BASE_URL")
    
    if use_ollama and ollama_url:
        print(f"[LLM Factory] Initializing Ollama Chat Model: {os.getenv('OLLAMA_MODEL', 'llama3')} (JSON: {json_mode})")
        from langchain_ollama import ChatOllama
        
        kwargs = {
            "model": os.getenv("OLLAMA_MODEL", "llama3"),
            "base_url": ollama_url,
            "temperature": temperature
        }
        if json_mode:
            kwargs["format"] = "json"
            
        return ChatOllama(**kwargs)
    else:
        print(f"[LLM Factory] Initializing Groq Chat Model")
        from langchain_groq import ChatGroq
        return ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=temperature,
            api_key=os.getenv("GROQ_API_KEY", "dummy_key")
        )

def get_embedding_model():
    global _embedding_model
    if _embedding_model is None:
        use_ollama = os.getenv("USE_OLLAMA", "false").lower() == "true"
        ollama_url = os.getenv("OLLAMA_BASE_URL")
        
        if use_ollama and ollama_url:
            print(f"[LLM Factory] Initializing Ollama Embedding Model: {os.getenv('OLLAMA_EMBEDDING_MODEL', 'nomic-embed-text')}")
            from langchain_ollama import OllamaEmbeddings
            _embedding_model = OllamaEmbeddings(
                model=os.getenv("OLLAMA_EMBEDDING_MODEL", "nomic-embed-text"),
                base_url=ollama_url
            )
        else:
            print(f"[LLM Factory] Initializing Gemini Embedding Model")
            from langchain_google_genai import GoogleGenerativeAIEmbeddings
            _embedding_model = GoogleGenerativeAIEmbeddings(
                model="models/gemini-embedding-2",
                google_api_key=os.getenv("GOOGLE_API_KEY")
            )
            
    return _embedding_model
