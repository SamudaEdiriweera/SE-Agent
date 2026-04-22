from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from .state import AgentState
from .nodes.designer import DesignerNode
from .nodes.coder import CoderNode # Import the CoderNode class, the Real Brain
from src.utils.tracker import AgentTracker # Import the service
from .nodes.reviewer import ReviewerNode
from .nodes.memory import MemoryNode
from langchain_core.messages import ToolMessage # Required for custom tool logic.


# 1. Initialize the tracker ONCE here
# This ensures that both the graph and its nodes use the same MLflow session
shared_tracker = AgentTracker()

# 2. Initialize the Node Instances
designer_instance = DesignerNode(MLflow_tracker=shared_tracker)
coder_instance = CoderNode(MLflow_tracker=shared_tracker)
reviewer_instance = ReviewerNode() # The reviewer doesn't need the tracker, so we can initialize it directly here. 
memory_instance = MemoryNode(MLflow_tracker=shared_tracker) # Memory node also needs the tracker to save to Pinecone 

# 3. Define the ToolNode
# This executes BOTH FileSystem tools and Pinecone Search tools automatically
tools_node = ToolNode(coder_instance.tools) # Pass the combined list of tools from the coder node

# --- ROUTING LOGIC (The "Agency of the Graph") ---
def should_continue(state: AgentState):
    """ 
    Decides if the Coder needs to use a tool or move to Review.
    """
    messages = state["messages"]
    last_message = messages[-1]

    # If the LLM made a 'tool_call', we MUST go to the tools node
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    
    # Otherwise, the LLM has finished its draft, move to Review
    return "reviewer"

def review_decision(state: AgentState):
    """
    Decides if the code is finished or needs fixing.
    """
    messages = state["messages"]
    last_message = messages[-1]

    # If the Reviewer said 'PASSED', we go to Memory
    if "PASSED" in last_message.content:
        return "memory"
    
    # If not passed, go back to Coder to fix the issues
    return "coder"

# --- BUILD THE AGENTIC GRAPH ---
        
# Build the Graph
workflow = StateGraph(AgentState)

# Add all 5 nodes
workflow.add_node("designer", lambda state: designer_instance(state))
workflow.add_node("coder", lambda state: coder_instance(state))
workflow.add_node("tools", tools_node) # This node will execute any tool calls made by the coder
workflow.add_node("reviewer", lambda state: reviewer_instance(state))
workflow.add_node("memory", lambda state: memory_instance(state))

# Set Entry Point
workflow.set_entry_point("designer")

# Designer always goes to coder first
workflow.add_edge("designer", "coder")

# --- THE AGENTIC LOOPS ---

# 1. Coder Loop: Decide between Tools or Review
workflow.add_conditional_edges(
    "coder",
    should_continue,
    {
        "tools": "tools",
        "reviewer": "reviewer"
    }
)

# 2. Tool Loop: After tools run, always return to Coder to see the result
workflow.add_edge("tools", "coder")

# 3. Review Loop: Decidecif we fix or save
workflow.add_conditional_edges(
    "reviewer",
    review_decision,
    {
        "coder": "coder",
        "memory": "memory"
    }
)

# Final Edge
workflow.add_edge("memory", END)

# Compile the graph

app = workflow.compile()
app.recursion_limit = 5 # Set a recursion limit to prevent infinite loops in case of issues

