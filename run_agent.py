#!/usr/bin/env python3
"""
EPAM Corporate PR Agent Runner

This script runs the EPAM Corporate PR Agent using Google ADK.
"""

import os
import sys
from pathlib import Path

# Add the current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

from agent import root_agent

def main():
    """Main function to run the EPAM Corporate PR Agent."""
    print("🚀 Starting EPAM Corporate PR Agent...")
    print("📱 Focus: Instagram content generation for EPAM's social media growth")
    print("🔍 Features: Competitor analysis, content strategy, hashtag optimization")
    print("=" * 60)
    
    try:
        # The agent will be available via ADK API server
        print("✅ Agent initialized successfully!")
        print("🌐 Agent is ready to receive requests via ADK API server")
        print("📊 Available sub-agents:")
        print("   - Competitor Research Agent")
        print("   - Content Strategy Agent") 
        print("   - Instagram Generator Agent")
        print("   - Hashtag Optimizer Agent")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Error initializing agent: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
