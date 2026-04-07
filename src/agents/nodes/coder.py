import mlflow
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
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
        # self.llm = ChatOpenAI(model="gpt-4o", temperature=0).bind_tools(self.tools)
        self.llm = ChatAnthropic(model="claude-opus-4-6", temperature=0).bind_tools(self.tools)

    def __call__(self, state):
        print("💻 Coder Node: Analyzing Figma and generating code...")

        # 1. Pull relevant memory from Pinecone
        memories = self.memory.query_memory(state['current_task'])
        memory_context = "\n".join([m.get('text', '') for m in memories])

        # 2. Extract the design plan from the lase message sent by the Designer
        design_plan = state['messages'][-1]

        # 3. Build the "Senior Propmt"
        prompt = f"""

        You are a Senior Software Engineer. your task: {state['current_task']}

        FOLLOW THIS DESIGN PLAN:
        {design_plan}

        Reference figma Design Data:
        {state['figma_data']}

        company Standards from Memory:
        {memory_context}

        Instructions:
        1. Write the React code.
        2. Use the 'write_file' tool to save the code to the workspace.
        """

        # 4. LLM Generate and Act
        # (In a full implementation, we bind the tools here)
        response = self.llm.invoke(prompt)
        code_content = ""
        file_path = "src/App.tsx"

        # Check if the AI actually used the tool correctly
        if response.tool_calls:
            print("🛠️ AI is using the 'write_file' tool...")
            # Get the first tool call's arguments
            tool_call = response.tool_calls[0]
            code_content = tool_call['args'].get('content', "")
            file_path = tool_call['args'].get('file_path', file_path)
        else:
            # Fallback if the AI just wrote text
            print("📝 AI provided raw text instead of a tool call...")
            code_content = response.content
            # Remove markdown code blocks if present (```tsx ...```)
            if "```" in code_content:
                code_content = code_content.split("```")[1].split("\n", 1)[1]

        # 5. Save the code
        # For this step, let's assume it writes App.tsx
        if code_content.strip():
            self.files_manager.write_file_logic(
                file_path=file_path, 
                content=code_content
            )
        else:
            print("⚠️ Warning: LLM returned empty code.")

        return {
            "messages": [f"Coder: Created {file_path} based on Figma design."],
            "generated_code": {file_path: code_content},
            "is_complete": True
        }