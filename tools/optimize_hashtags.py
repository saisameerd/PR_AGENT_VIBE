import os
import requests
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

def optimize_hashtags(content_theme: str) -> Dict[str, Any]:
    """
    Optimizes hashtags for Instagram content using Tavily's search API.

    Args:
        content_theme (str): The theme of the content for hashtag optimization.

    Returns:
        Dict[str, Any]: A dictionary containing optimized hashtag suggestions.
    """

    url = "https://api.tavily.com/search"

    payload = {
        "query": f"Instagram hashtags {content_theme} IT technology software development trending",
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
