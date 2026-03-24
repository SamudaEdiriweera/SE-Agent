import mlflow
from langchain_openai import ChatOpenAI
from src.tools.file_system import FileSystemTool
from src.db.pinecone_client import MemoryBank
from src.utils.tracker import AgentTracker


class CoderNode:
    def __init__(self, MLflow_tracker: AgentTracker):
        self.memory = MemoryBank()
        # 1. Initialize the tools
        self.files_manager = FileSystemTool(MLflow_tracker=MLflow_tracker)
        
        # 2. Define the list of tools the AI can use
        self.tools = self.files_manager.to_tools()

        # 3. Bind tools to the LLM (This is the Senior SE way)
        # we use GPT-4o or claude 3.5 Sonnet fo the best coding results
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0).bind_tools(self.tools)

    def __call__(self, state):
        print("💻 Coder Node: Analyzing Figma and generating code...")

        # 1. Pull relevant memory from Pinecone
        memories = self.memory.query_memory(state['current_task'])
        memory_context = "\n".join([m.get('text', '') for m in memories])

        # 2. Build the "Senior Propmt"
        prompt = f"""

        You are a Senior Software Engineer. your task: {state['current_task']}

        Reference figma Design Data:
        {state['figma_data']}

        company Standards from Memory:
        {memory_context}

        Instructions:
        1. Write the React code.
        2. Use the 'write_file' tool to save the code to the workspace.
        """

        # 3. LLM Generate and Act
        # (In a full implementation, we bind the tools here)
        response = self.llm.invoke(prompt)
        code_content = response.content
        file_path = "src/App.tsx"

        # For this step, let's assume it writes App.tsx
        self.files_manager.write_file_logic(
            file_path=file_path, 
            content=code_content
           )

        return {
            "messages": [f"Coder: Created App.tsx based on Figma design."],
            "is_complete": True
        }