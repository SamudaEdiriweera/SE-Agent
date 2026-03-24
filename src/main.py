import os
import mlflow
from src.agents.graph import app, shared_tracker
from src.tools.figma_api import FigmaTool


figma_tool = FigmaTool()

def run_intern(figma_url: str, task: str):
    # 1. Start tracking (DRY: ONE line handles all setup/tags)
    shared_tracker.start_coding_session(task_name="LMS_Task", task_type="Figma_to_React")

    try:
        # 2. Extract file Key and Node ID from URL
        # Use a try/except or slpit logic safetly
        try:
            file_key = figma_url.split("/design/")[1].split("/")[0]
            node_id = figma_url.split("node-id=")[1].split("&")[0].replace("-", ":")
        except ImportError:
            print("❌ Error: Invalid Figma URL format.")
            return

        print(f"🚀 Starting Task: {task}")
        print(f"🔍 Fetching Figma Node: {node_id} from File: {file_key}")

        # 3. Get the actual design data
        raw_figma = figma_tool.get_file_nodes(file_key, [node_id])

        # Access the specific node correctly from Figma's nested response
        node_data = raw_figma.get("nodes", {}).get(node_id)
        if not node_data:
            print(f"❌ Error: Could not find node {node_id} in the Figma file.")
            return
        
        clean_figma = figma_tool.simplify_node(node_data)

        # 4. Setup the initial state for the Agent
        initial_state = {
            "messages": [f"Request: {task}"],
            "figma_data": clean_figma,
            "generated_code": {},
            "errors": [],
            "current_task": task,
            "is_complete": False
        }

        # 5. run the Agentic Brain
        final_state = app.invoke(initial_state)

        # 6. Log the final generated code to MLflow Artifacts (Crucial Step!)
        if final_state.get("generated_code"):
            shared_tracker.log_final_output(final_state["generated_code"])

        print("\n✅ Task Complete!")
        print(f"Final Message: {final_state['messages'][-1]}")
        print(f"📂 Check the 'workspace/' folder or MLflow UI for the generated code.")

    except Exception as e:
        print(f"❌ System Error: {str(e)}")

        # USE THE SHARED TRACKER INSTEAD OF MANUAL MLFLOW CALLS
        shared_tracker.log_error(e)


    finally:
        # 7. Ensure the MLflow run is closed
        shared_tracker.end_session()

if __name__ == "__main__":
    # Test with your LMS Figma URL
    URL = "https://www.figma.com/design/kcTJQNg0LOgHevbAjpvIfk/LMS-sample?node-id=1-2&t=R7PWdykVdqQlaLMT-0"
    TASK = "Build a responsive React component for this LMS card design using Tailwind CSS."

    run_intern(URL, TASK)


