from langgraph.graph import StateGraph, END
from .state import AgentState
from .nodes.coder import CoderNode # Import the CoderNode class, the Real Brain

# Initialize the Real Nodes
# This allows the coder to keep its own LLM and Tool settings
coder_instance = CoderNode()

# Node 1: The Designer 
def designer_node(state: AgentState):
    print("🎨 Designer Node: Analyzing Figma Design Data...")
    # Here the AI will eventually look at figma JSON and create a 'Plan'
    return {"messages": ["Designer: Created a UI plan based on Figma."]}

# Node 2: The Coder
def coder_node(state: AgentState):
    # This calls the __call__ method in your CoderNode class, which generates code and writes it to the file system

    return coder_instance(state)
        

# Build the Graph
workflow = StateGraph(AgentState)

# Add our nodes
workflow.add_node("designer", designer_node)
workflow.add_node("coder", coder_node)

# Connect them: Desinger -> Coder -> End
workflow.set_entry_point("designer")
workflow.add_edge("designer", "coder")
workflow.add_edge("coder", END)

# Compile the graph
app = workflow.compile()
