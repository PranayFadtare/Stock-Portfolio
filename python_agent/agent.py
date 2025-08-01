# python_agent/agent.py
import json
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage
from tools import all_tools

def initialize_agent():
    """Initializes and returns the finance agent executor."""
    # 1. Update the system prompt to make the agent aware of portfolio data
    prompt = ChatPromptTemplate.from_messages([
        ("system", (
            "You are a helpful financial assistant. If the user provides their portfolio data as a JSON object in the prompt, "
            "use that data to answer questions about their holdings, such as calculating total value or summarizing their positions. "
            "Do not use your tools to find portfolio information if it is already provided. Use your tools for all other requests, like fetching live stock prices or news."
        )),
        MessagesPlaceholder(variable_name="messages"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ])

    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0)
    finance_agent = create_tool_calling_agent(llm, all_tools, prompt)
    agent_executor = AgentExecutor(
        agent=finance_agent, 
        tools=all_tools, 
        verbose=True
    )
    return agent_executor

# 2. Update run_agent to handle the new payload structure
def run_agent(agent_executor, payload: dict) -> dict:
    """Runs the agent with a given payload and returns the response."""
    query = payload.get('query')
    portfolio = payload.get('portfolio')
    
    prompt_content = ""

    # 3. If portfolio data exists, format it nicely for the LLM
    if portfolio:
        # Using json.dumps to format the portfolio data clearly
        portfolio_str = json.dumps(portfolio, indent=2)
        prompt_content = (
            f"Here is my current portfolio:\n\n"
            f"```json\n{portfolio_str}\n```\n\n"
            f"Based on my portfolio and any other live information you can fetch with your tools, please answer my question: {query}"
        )
    else:
        # If no portfolio, the prompt is just the user's query
        prompt_content = query
    
    # 4. Invoke the agent with the potentially enriched prompt
    response = agent_executor.invoke({
        "messages": [HumanMessage(content=prompt_content)]
    })
    return response