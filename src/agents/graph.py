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

# 3. Create CUSTOM TOOL NODE (The 'Senior SE' Oberservability Layer)
def custom_tools_node(state):
    """ 
    Executes tool calls made by the Coder and prints progress to terminal.
    This ensures the 'Agentic Loop' is visible and doesn't look 'stuck'.
    """
    print("\n🛠️  Node: Executing Intern's Tool Calls...")

    messages = state["messages"] # Get the full message history to find any tool calls made by the LLM
    last_message = messages[-1] # This is the message that may contain tool calls from the LLM

    tool_outputs = []

    # The LLM can request multiple tools at once
    for tool_call in last_message.tool_calls:
        tool_name = tool_call["name"]
        tool_args = tool_call["args"]

        print(f"    🔧 Tool Call Detected: [{tool_name}]")
        print(f"    📝 Arguments: {tool_args}")

        # 1. Find the tool in the coder's tool belt
        selected_tool = next((t for t in coder_instance.tools if t.name == tool_name), None)

        if selected_tool:
            try:
                # 2. Execute the tool logic
                output = selected_tool.invoke(tool_args)
                print(f"    ✅ Tool Result: Success")
            except Exception as e:
                output = f"Error executing tool: {str(e)}"
                print(f"   ❌ Tool Result: Error - {str(e)}")
        else:
            output = f"Error: Tool '{tool_name}' not found"
            print(f"    ❌ Tool Result: Not Found")

        # 3. Create a ToolMessage (This sends the result back to the Coder)
        tool_outputs.append(ToolMessage(
            tool_call_id = tool_call["id"],
            content=str(output)
        ))

    return {"messages": tool_outputs}


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
workflow.add_node("tools", custom_tools_node) # Using our NEW custom node here
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

