from langchain_openai import ChatOpenAI
from src.utils.tracker import AgentTracker

class DesignerNode:
    def __init__(self, MLflow_tracker: AgentTracker):
        # The Designer doesn't need tools, just high reasoning
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0)
        self.tracker = MLflow_tracker

    def __call__(self, state):
        print("🎨 Designer Node: Analyzing Figma layout and creating a Technical Spec...")
        # 1. Use the full message history
        # This allows the designer to see if a Reviewer previously asked for
        # Changes to the design.
        messages = state.get("messages", [])
        figma_data = state.get("figma_data", {})

        # 2. System Instruction (Defining the Persona)
        system_instruction = (
            "You are a Lead UI/UX Architect. You turn Figma JSON into technical specs."
            "Focus on layout, responsive design tokens, and component breakdown."
        )
        
        # 3. Enhanced Prompt
        # We don't just send the task; we send the Figma data as a reference.
        prompt = f"""
        Based on this Figma Data: {figma_data}

        Create a Technical Implementation Plan for the following objective:
        {state.get('current_task')}

        REQUIREMENTS:
        1. Identify the layout strucutre (Flexbox/Grid)
        2. Extract the color palette (hex codes) and typography (font sizes)
        3. Break the UI into smaller reusable React components.
        4. Define the Tailwind CSS classes needed to match the design.

        OUTPUT: Provide a Markdown technical specification.
        """

        # 4. Invoke LLM
        response = self.llm.invoke([
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": prompt}
        ])

        design_plan = response.content
        # 5. AGENTIC CHANGE:
        # We return the design plan as a message.
        # We DO NOT overwrite 'current_task' with whole plan.
        # We keep the 'current_task' as the original short goal to avoid Pinecone ID errors.
        return {
            "messages": [f"DESIGNER_SPEC: {design_plan}"]
        }