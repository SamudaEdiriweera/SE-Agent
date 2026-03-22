""" 
    MLflow initialization and tracking utilities.
"""

import mlflow
from .tracker import app

# 1. Enable Autologging for LangChain/LangGraph
# This captures every thought, every tool call, and every token spent automatically.
mlflow.langchain.autolog()  # Automatically logs all interactions with LangChain and LangGraph

# Start a 'Coding Session'
def run_intern_task(task_description):
    with mlflow.start_run(run_name = "Figma_to_React_Coding_Session"):
        # 2. Tag it so you can search for it later
        mlflow.set_tag("developer", "Senior_SE_Me")
        mlflow.set_tag("task_type", "UI_Generation")
        # mlflow.log_param("model", "gpt-4o")
        # mlflow.log_param("figma_file", "LMS_Dashboard.fig")

        mlflow.log_input(mlflow.data.from_dict({"task": task_description}), context="training")

        # 4. Run the Agent
        result = app.invoke({"messages": [task_description]})

        # 5. Log the "Output" (The Code generated)
        mlflow.log_text(str(result["generated_code"]), "final_code.tsx")
        
        return result
    