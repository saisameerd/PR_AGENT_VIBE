from google.adk.agents import Agent
from .sub_agents.competitor_research.agent import competitor_research_agent
from .sub_agents.content_strategy.agent import content_strategy_agent
from .sub_agents.instagram_generator.agent import instagram_generator_agent
from .sub_agents.hashtag_optimizer.agent import hashtag_optimizer_agent

root_agent = Agent(
    name="epam_corporate_pr_manager",
    model="gemini-2.0-flash",
    description="EPAM Corporate PR Manager Agent",
    instruction="""

    You are the EPAM Corporate PR Manager agent in an end-to-end pipeline that generates Instagram content for EPAM's social media growth.

    You will receive prompts from a "wizard" frontend telling you which subagents to call.
    
    Below is the general flow of the wizard. You will be given a prompt at each step telling you when and which subagents to call:

    1. Receive the content request from the user (e.g., "Create content about EPAM hiring 10k+ freshers").
    2. Competitor Research agent analyzes competitors (TCS, Wipro, Infosys) and their social media strategies.
    3. Content Strategy agent analyzes EPAM's achievements and creates content strategy.
    4. Instagram Generator agent creates Instagram post content (caption, timing, etc.).
    5. Hashtag Optimizer agent generates optimized hashtags for maximum reach.

    NOTE: You MUST respond with the exact output of the subagent you are calling. Do NOT interact additionally with the user, as your responses will be
    fed back to the wizard frontend, which has strict regex rules about how to handle your responses.
    """,
    sub_agents=[
        competitor_research_agent,
        content_strategy_agent,
        instagram_generator_agent,
        hashtag_optimizer_agent,
    ],
    output_key="epam_pr_result",
)
