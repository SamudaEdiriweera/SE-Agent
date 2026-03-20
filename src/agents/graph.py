from langgraph.graph import StateGraph, END
from .state import AgentState

# Node 1: The Designer
def designer_node(state: AgentState):
    print("🎨 Designer Node: Analyzing Figma Design Data...")
    # Here the AI will eventually look at figma JSON and create a 'Plan'
    return {"messages": ["Designer: Created a UI plan based on Figma."]}

# Node 2: The Coder
def coder_node(state: AgentState):
    print("💻 Node: Coder is generating code...")
    # Here the AI will write the React/FastAPI code based on the Designer's plan and Figma data
    return {"messages": ["Coder: Generated the initial components."]}

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
