import os
import re
# Heavy libraries imported lazily inside functions
from pydantic import BaseModel, Field
from typing import List, Optional
from langchain_core.language_models import BaseChatModel
import logging

# Load spaCy model lazily
_nlp = None

def get_nlp():
    global _nlp
    if _nlp is None:
        import spacy
        try:
            _nlp = spacy.load("en_core_web_sm")
        except OSError:
            # Fallback if model isn't downloaded yet
            import subprocess
            subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
            _nlp = spacy.load("en_core_web_sm")
    return _nlp

# ---------------------------------------------------------------------------
# File I/O using unstructured
# ---------------------------------------------------------------------------

def extract_text_from_resume(file_path: str) -> str:
    """
    Extract text from PDF or DOCX using unstructured.
    It automatically handles OCR if needed.
    """
    try:
        from unstructured.partition.auto import partition
        elements = partition(filename=file_path)
        text = "\n".join([str(el) for el in elements])
        return text
    except Exception as e:
        print(f"Error parsing document with unstructured: {e}")
        # Fallback to basic string if it completely fails, though unstructured is robust.
        return ""

def is_likely_resume(text: str) -> bool:
    """
    A lightweight heuristic check to see if the extracted text looks like a resume.
    This helps prevent wasting LLM tokens on random company documents or invoices.
    """
    if not text or len(text.strip()) < 50:
        return False
        
    text_lower = text.lower()
    keywords = [
        "experience", "education", "skills", "resume", "cv", "curriculum vitae",
        "work history", "employment", "projects", "certifications", "profile",
        "summary", "technologies", "university", "college", "degree", "bachelor",
        "master", "phd", "academic", "career"
    ]
    
    # Count distinct keywords present
    match_count = sum(1 for kw in keywords if re.search(r'\b' + kw + r'\b', text_lower))
    
    # Require at least 3 common resume keywords to proceed
    return match_count >= 3

# ---------------------------------------------------------------------------
# LLM Extraction using Groq
# ---------------------------------------------------------------------------

class CandidateDetails(BaseModel):
    name: Optional[str] = Field(None, description="The full name of the candidate.")
    email: Optional[str] = Field(None, description="The primary email address of the candidate.")
    phone: Optional[str] = Field(None, description="The primary phone number of the candidate.")
    location: Optional[str] = Field(None, description="The current city or location of the candidate.")
    experience: int = Field(0, description="The total years of professional experience mentioned. Return 0 if none.")
    skills: List[str] = Field(default_factory=list, description="A list of technical and soft skills possessed by the candidate.")
    education: Optional[str] = Field(None, description="A brief summary of the candidate's highest education.")

def extract_details_with_gemini(text: str) -> CandidateDetails | None:
    """
    Extracts all candidate details in one pass using Groq with structured output.
    Returns None if the LLM call fails.
    """
    api_key = os.getenv("GROQ_API_KEY")
    use_ollama = os.getenv("USE_OLLAMA", "false").lower() == "true"
    ollama_url = os.getenv("OLLAMA_BASE_URL")
    
    if not api_key and not (use_ollama and ollama_url):
        logging.warning("No LLM credentials found (GROQ_API_KEY or OLLAMA_BASE_URL). Skipping extraction.")
        return None
        
    try:
        from app.services.llm_factory import get_chat_model
        llm = get_chat_model(temperature=0.0, json_mode=True)
        
        structured_llm = llm.with_structured_output(CandidateDetails)
        
        print(f"🤖 [Resume Parser] Sending resume to LLM for parsing (Length: {len(text[:15000])} chars)...")
        
        schema_instructions = """
EXPECTED JSON FIELDS:
- "name": Full name of the candidate (string or null).
- "email": Primary email address (string or null). Do NOT hallucinate. If not found, return null.
- "phone": Primary phone number (string or null). Do NOT hallucinate.
- "location": City, State, or Country (string or null).
- "experience": Total years of experience as an integer (e.g., 0, 2, 5).
- "skills": Array of strings containing all technical and soft skills (e.g., ["Java", "Python", "React"]). Extract as many as possible.
- "education": Brief summary of the highest degree (string or null).
"""
        
        prompt = (
            "You are an expert ATS resume parser. Your job is to extract candidate details from the text below.\n"
            f"{schema_instructions}\n"
            "CRITICAL: You MUST return a valid JSON object that exactly matches these fields. "
            "Do NOT hallucinate emails or phone numbers. If a value is missing in the text, use null.\n\n"
            f"--- RESUME TEXT ---\n{text[:15000]}"
        )
        
        result = structured_llm.invoke(prompt)
        print(f"✅ [Resume Parser] Successfully parsed data for: {result.name}")
        return result
    except Exception as e:
        print(f"❌ [Resume Parser] Error during LLM extraction: {e}")
        logging.error(f"Error during LLM extraction: {e}")
        return None