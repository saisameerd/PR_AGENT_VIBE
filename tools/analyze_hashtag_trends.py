import os
import requests
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

def analyze_hashtag_trends() -> Dict[str, Any]:
    """
    Analyzes trending hashtags in the IT/tech industry using Tavily's search API.

    Returns:
        Dict[str, Any]: A dictionary containing trending hashtag analysis.
    """

    url = "https://api.tavily.com/search"

    payload = {
        "query": "trending hashtags 2024 IT technology software development Instagram LinkedIn",
        "topic": "general",
        "search_depth": "basic",
        "chunks_per_source": 2,
        "max_results": 2,
        "time_range": None,
        "days": 7,
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
