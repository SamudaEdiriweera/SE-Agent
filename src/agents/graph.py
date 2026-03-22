from langgraph.graph import StateGraph, END
from .state import AgentState
from ..tools.file_system import FileSystemTool

# Initialize the file system tool
file_tool = FileSystemTool()

# Node 1: The Designer
def designer_node(state: AgentState):
    print("🎨 Designer Node: Analyzing Figma Design Data...")
    # Here the AI will eventually look at figma JSON and create a 'Plan'
    return {"messages": ["Designer: Created a UI plan based on Figma."]}

# Node 2: The Coder
def coder_node(state: AgentState):
    print("💻 Node: Coder is generating code...")

    # In real run, the LLM would provide this content.
    # For now, we simulate writing a React component.
    code_content = "import React from 'react';\n\nexport const App = () => <div> LMS Dashboard </div>;"

    # The Intern 'Acts'
    file_tool.write_file("src/App.tsx", code_content)

    return {
        "messages": ["Coder: I have successfully created the App.tsx file in the workspace."],
        "generated_code": {"src/App.tsx": code_content}
        }
        

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
