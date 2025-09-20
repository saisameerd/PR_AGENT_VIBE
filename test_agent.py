#!/usr/bin/env python3
"""
Test script for EPAM Corporate PR Agent

This script tests the agent functionality without running the full API server.
"""

import os
import sys
from pathlib import Path

# Add the current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

def test_imports():
    """Test that all modules can be imported successfully."""
    print("🧪 Testing imports...")
    
    try:
        from agent import root_agent
        print("✅ Root agent imported successfully")
        
        from sub_agents.competitor_research.agent import competitor_research_agent
        print("✅ Competitor research agent imported successfully")
        
        from sub_agents.content_strategy.agent import content_strategy_agent
        print("✅ Content strategy agent imported successfully")
        
        from sub_agents.instagram_generator.agent import instagram_generator_agent
        print("✅ Instagram generator agent imported successfully")
        
        from sub_agents.hashtag_optimizer.agent import hashtag_optimizer_agent
        print("✅ Hashtag optimizer agent imported successfully")
        
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def test_tools():
    """Test that all tools can be imported."""
    print("\n🔧 Testing tools...")
    
    try:
        from tools.search_competitors import search_competitors
        print("✅ Search competitors tool imported")
        
        from tools.analyze_social_strategy import analyze_social_strategy
        print("✅ Analyze social strategy tool imported")
        
        from tools.analyze_epam_achievements import analyze_epam_achievements
        print("✅ Analyze EPAM achievements tool imported")
        
        from tools.create_content_strategy import create_content_strategy
        print("✅ Create content strategy tool imported")
        
        from tools.optimize_hashtags import optimize_hashtags
        print("✅ Optimize hashtags tool imported")
        
        from tools.analyze_hashtag_trends import analyze_hashtag_trends
        print("✅ Analyze hashtag trends tool imported")
        
        return True
        
    except ImportError as e:
        print(f"❌ Tool import error: {e}")
        return False

def test_environment():
    """Test environment configuration."""
    print("\n🌍 Testing environment...")
    
    # Check if .env file exists
    env_file = Path(".env")
    if env_file.exists():
        print("✅ .env file found")
    else:
        print("⚠️  .env file not found - create one from env.example")
    
    # Check for required environment variables
    required_vars = ["TAVILY_API_KEY"]
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"⚠️  Missing environment variables: {', '.join(missing_vars)}")
        print("   Set these in your .env file")
    else:
        print("✅ All required environment variables found")
    
    return len(missing_vars) == 0

def main():
    """Run all tests."""
    print("🚀 EPAM Corporate PR Agent - Test Suite")
    print("=" * 50)
    
    tests = [
        test_imports,
        test_tools,
        test_environment
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Agent is ready to use.")
        print("\n🚀 To start the agent:")
        print("   1. Set up your .env file with TAVILY_API_KEY")
        print("   2. Run: adk api_server --port 8000 --host 0.0.0.0 --allow_origins '*' .")
        print("   3. Start frontend: cd frontend && npm run dev")
    else:
        print("❌ Some tests failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
