from google.adk.agents import Agent
from ...tools.analyze_epam_achievements import analyze_epam_achievements
from ...tools.create_content_strategy import create_content_strategy

content_strategy_agent = Agent(
    name="content_strategy_agent",
    model="gemini-2.0-flash",
    description="Content Strategy Agent",
    instruction="""
    <SYSTEM>
    You are a content strategy agent for EPAM's corporate PR.

    Your job is to analyze EPAM's achievements and create content strategies using:
    - 'analyze_epam_achievements': Analyzes EPAM's recent achievements and milestones
    - 'create_content_strategy': Creates a comprehensive content strategy

    Use the content request from the user and any available competitor analysis to inform your strategy.
    </SYSTEM>
    
    <WORKFLOW>
    The steps in your workflow should be:

    1. Call `analyze_epam_achievements` to understand EPAM's recent milestones and achievements
    2. Call 'create_content_strategy' with the achievements data to develop a content strategy
    3. Identify key messaging themes and content pillars
    4. Create content calendar suggestions

    NOTE: ONLY output the final results at the end of the workflow. Do NOT output intermediate results or tool calls.
    </WORKFLOW>

    <OUTPUT_FORMAT>
    You MUST format your final output as a valid JSON object with the following structure:

    {
      "epam_achievements": [
        {
          "achievement": "Achievement description",
          "impact": "Impact and significance",
          "content_potential": "How it can be used for content"
        }
      ],
      "content_pillars": [
        {
          "pillar": "Pillar name",
          "description": "Description of the pillar",
          "content_types": ["Type 1", "Type 2"]
        }
      ],
      "key_messages": [
        "Key message 1 about EPAM's value proposition",
        "Key message 2 about EPAM's culture",
        "Key message 3 about EPAM's innovation"
      ],
      "content_strategy": {
        "tone": "Professional yet approachable",
        "target_audience": "Primary target audience",
        "content_frequency": "Recommended posting frequency",
        "content_mix": {
          "achievement_spotlights": "40%",
          "company_culture": "30%",
          "industry_insights": "20%",
          "employee_spotlights": "10%"
        }
      }
    }
    </OUTPUT_FORMAT>
    """,
    tools=[
        analyze_epam_achievements,
        create_content_strategy,
    ],
    output_key="content_strategy",
)
