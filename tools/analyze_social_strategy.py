import os
import requests
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

def analyze_social_strategy(company_name: str) -> Dict[str, Any]:
    """
    Analyzes a specific company's social media strategy using Tavily's search API.

    Args:
        company_name (str): The name of the company to analyze.

    Returns:
        Dict[str, Any]: A dictionary containing the social media strategy analysis.
    """

    url = "https://api.tavily.com/search"

    payload = {
        "query": f"{company_name} Instagram LinkedIn social media strategy content marketing",
        "topic": "general",
        "search_depth": "basic",
        "chunks_per_source": 3,
        "max_results": 2,
        "time_range": None,
        "days": 30,
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
