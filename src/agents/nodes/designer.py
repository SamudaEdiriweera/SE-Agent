from langchain_openai import ChatOpenAI
from src.utils.tracker import AgentTracker

class DesignerNode:
    def __init__(self, MLflow_tracker: AgentTracker):
        # The Designer doesn't need tools, just high reasoning
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0)
        self.tracker = MLflow_tracker

    def __call__(self, state):
        print("🎨 Designer Node: Analyzing Figma layout and creating a Technical Spec...")

        figma_data = state.get("figma_data", {})
        task = state.get("current_task", "")

        prompt = f"""
        You are a Lead UI/UX Architect. Your goal is tom analyze Figma JSON and create a 
        Technical Implementation Plan for a developer.

        TASK: {task}
        FIGMA DATA: {figma_data}

        INSTRUCTIONS:
        1. Identify the layout strucutre (Flexbox/Grid)
        2. Extract the color palette (hex codes) and typography (font sizes)
        3. Break the UI into smaller reusable React components.
        4. Define the Tailwind CSS classes needed to match the design.

        OUTPUT: Provide a Markdown technical specification.
        """

        response = self.llm.invoke(prompt)
        design_plan = response.content

        # We store the plan in the 'messages' so the Coder can read it
        return {
            "messages": [f"DESIGN_PLAN: {design_plan}"],
            "current_task": f"Implement this plan: {design_plan}"
        }