import os
import requests
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

def analyze_epam_achievements() -> Dict[str, Any]:
    """
    Analyzes EPAM's recent achievements and milestones using Tavily's search API.

    Returns:
        Dict[str, Any]: A dictionary containing EPAM's achievements and milestones.
    """

    url = "https://api.tavily.com/search"

    payload = {
        "query": "EPAM Systems achievements milestones 2024 hiring freshers growth awards recognition",
        "topic": "general",
        "search_depth": "basic",
        "chunks_per_source": 3,
        "max_results": 2,
        "time_range": None,
        "days": 90,
        "include_answer": True,
        "include_raw_content": True,
        "include_images": False,
        "include_image_descriptions": False,
        "include_domains": [],
        "exclude_domains": [],
        "country": None,
    }
    headers = {
        "Authorization": f"Bearer {TAVILY_API_KEY}",
        "Content-Type": "application/json",
    }

    response = requests.request("POST", url, json=payload, headers=headers)
    return response.json()
