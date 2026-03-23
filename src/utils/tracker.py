""" 
    MLflow initialization and tracking utilities.
"""

import mlflow
from datetime import datetime
import os


class AgentTracker:
    def __init__(self):
        # . SET TRACKING URI (The Database Method)
        # This is the most important line. It tells MLflow to store 'Names' in a DB
        # and 'Files' in the mlruns folder, keeping them perfectly
        db_path = "sqlite:///mlflow.db"
        mlflow.set_tracking_uri(db_path)

        # . Standardize Setup (Do this ONCE)
        mlflow.set_experiment("AI_Intern_Developments") # Set the MLflow experiment name for tracking all runs related to AI intern developments

        # 3. Enable Autologging
        # Captures every thought, tool call, and token automatically, so you can analyze the intern's "thought process" later.
        mlflow.langchain.autolog() # Enable automatic logging for LangChain interactions, which captures all LLM calls, tool usage, and generated content for traceability and analysis.

    def start_coding_session(self, task_name: str, task_type="UI_Generation"):
        """ 
        Starts a standardized tracking session.
        Returns the active run context.
        """
        # Safety check: If a run is already open, close it first
        if mlflow.active_run():
            mlflow.end_run()
        
        # Fixed the timestamp syntax error from your previous version
        timestamp = datetime.now().strftime('%H%M')
        run_name = f"{task_name}_{timestamp}"

        # Start the run and set global tags
        run = mlflow.start_run(run_name=run_name) # Start a new MLflow run with a descriptive name based on the task and current time
        mlflow.set_tag("developer", "Senior_SE_Me") # Tag the run with
        mlflow.set_tag("task_type", task_type) # Tag the run with the type of task being performed (e.g., UI_Generation, API_Development)

        return run # Return the active MLflow run context for further logging within the session
    
    def log_final_output(self, generated_code: dict):

        """ 
        Standardized way to save the final code into MLflow for traceability.
        """
        for filename, content in generated_code.items():
            mlflow.log_text(content, f"production-ready/{filename}")

    def end_session(self):
        if mlflow.active_run():
            mlflow.end_run()



    