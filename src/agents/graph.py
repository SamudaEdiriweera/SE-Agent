from langgraph.graph import StateGraph, END
from .state import AgentState
from .nodes.designer import DesignerNode
from .nodes.coder import CoderNode # Import the CoderNode class, the Real Brain
from src.utils.tracker import AgentTracker # Import the service

# 1. Initialize the tracker ONCE here
# This ensures that both the graph and its nodes use the same MLflow session
shared_tracker = AgentTracker()

# 2. Pass the tracker into the CoderNode (Fixes your TypeError)
designer_instance = DesignerNode(MLflow_tracker=shared_tracker)
coder_instance = CoderNode(MLflow_tracker=shared_tracker)

# Node 1: The Designer 
def designer_node(state: AgentState):
    return designer_instance(state)

# Node 2: The Coder
def coder_node(state: AgentState):
    # This calls the __call__ method in your CoderNode class, which generates code and writes it to the file system
    return coder_instance(state)

# Node 3
def memory_node(state: AgentState):
    print("🧠 Node: Archiving design pattern to Pinecone...")

    # Extract the summary of the figma design
    figma_name = state.get('figma_data', {}).get('name', 'Unknown_Component')

    # Fix IS HERE: Change .value() to .values()
    generated_files = state.get('generated_code', {})

    # We take the content of the first file generated to store as the reference
    if generated_files:
        first_file_content = list(generated_files.values())[0] 
    else:
        first_file_content = ""

    # SAve it
    shared_tracker.save_to_long_term_memory(
        figma_summary=f"Component: {figma_name}",
        generated_code=first_file_content,
        task_name=state['current_task']
    )

    return {"messages": ["Memory: Pattern archived for future refernce."]}
        

# Build the Graph
workflow = StateGraph(AgentState)

# Add our nodes
workflow.add_node("designer", designer_node)
workflow.add_node("coder", coder_node)
workflow.add_node("memory", memory_node)

# Connect them: Desinger -> Coder -> End
workflow.set_entry_point("designer")
workflow.add_edge("designer", "coder")
workflow.add_edge("coder", "memory")
workflow.add_edge("memory", END)

# Compile the graph
app = workflow.compile()
