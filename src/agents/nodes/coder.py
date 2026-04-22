import mlflow
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from src.tools.file_system import FileSystemTool
from src.db.pinecone_client import MemoryBank
from src.utils.tracker import AgentTracker
from langchain_core.messages import SystemMessage


class CoderNode:
    def __init__(self, MLflow_tracker: AgentTracker):

        # 1. Initialize the tools
        self.files_manager = FileSystemTool(MLflow_tracker=MLflow_tracker)
        self.memory = MemoryBank()

        # 2. Define the list of tools the AI can use
        self.tools = self.files_manager.to_tools() + [self.memory.to_tool()]

        # 3. Bind tools to the LLM (This is the Senior SE way)
        # we use GPT-4o or claude 3.5 Sonnet fo the best coding results
        # self.llm = ChatOpenAI(model="gpt-4o", temperature=0).bind_tools(self.tools)
        self.llm = ChatAnthropic(model="claude-opus-4-6", temperature=0).bind_tools(self.tools)

    def __call__(self, state):
        print("💻 Coder Node: Analyzing Figma and generating code...")
        # We NO LONGER extract designer_plan or query memory manually.
        # The LLM sees the whole message history and decides which tools to call.

        # 1. Define the System Insruction
        system_instruction_string = (
            "You are a Senior SE. You have access to tools to search memory and write files."
                       "Review the designer's plan in the history and implement it."
                       "If you need standards, use search_knowledge_base."
                       "When ready, use write_file to save your code."
        )


        

        # 2. CONSTRUCT THE MESSAGE LIST (Crucial Step)
        # We put the SystemMessage at the start, then add the conversation history
        system_message = SystemMessage(content=system_instruction_string)

        # Combine with the history from state
        messages = [system_message] + state['messages']

        print(f"📡 Sending {len(messages)} messages to Claude...")

        try:
            # 3. Invoke the LLM with the combined messages
            response = self.llm.invoke(messages)
            print(f"✅ LLM Response recevied: {response}")

            # Return the response to the Graph
            return {"messages": [response]}
        except Exception as e:
            print(f"❌ Error during LLM invocation: {str(e)}")
            return {"messages": [f"ERROR: {str(e)}"]}
        # print("#####Test-4.2.2######")
        # # Pass the entire conversation history (state['messages])
        # response = self.llm.invoke(state['messages'])
        # print("#####Test-4.2.3######")
        # # We just return the response. The Graph will handle the 'Action'
        # return {"messages": [response]}
    