"""
Here, this tool allows the "Coder" node to actually write files to my workspace/ folder
it must be able to:
    1.Create a folder structure.
    2. Write a package.json.
    3. Write the React components.
    4. Save the ML model logic.
"""

import os 
import mlflow
from langchain_core.tools import tool
from src.utils.tracker import AgentTracker


class FileSystemTool:
    def __init__(self, MLflow_tracker: AgentTracker, base_path="workspace"):
        self.base_path = base_path
        self.MLflow_tracker = MLflow_tracker # USe the centralized tracker service
        # Ensure the workspace exists
        if not os.path.exists(self.base_path):
            os.makedirs(self.base_path)
    
    # # We use the @tool decorator here
    # # IMPORTANT: The docstring below is what the AI reads to understand the tool!
    # @tool
    def write_file_logic(self, file_path: str, content: str):
        """ 
        Internal logic to write files.
        
        """

        full_path = os.path.join(self.base_path, file_path) # Combine base path with the provided file path
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(full_path), exist_ok=True) # Create the directory structure if it doesn't exist

        with open(full_path, "w") as f: # Open the file for writing
            f.write(content)

        # USE TRACKER SERVICE
        # instead of calling mlflow directly, we use our standardized service.
        # This ensures the artifacts are saved in the 'production_ready' folder.
        self.MLflow_tracker.log_final_output({file_path: content})

        print(f"📂 Created file: {full_path}")
        return f"Successfully wrote to {file_path}"
    
    # @tool
    def list_files_logic(self):
        """ 
        Internal logic to list files.
        """
        files_list = [] # Initialize an empty list to store file paths
        for root, _, files  in os.walk(self.base_path): # Walk through the base directory and its subdirectories
            for file in files: # Iterate through each file found
                files.append(os.path.relpath(os.path.join(root, file), self.base_path)) # Append the relative path of the file to the files_list
        return files_list # Return the list of file paths
    
    def to_tools(self):
        """ 
        Tool Factory: This creates LangChain tools without the 'self' error.
        This is the professional way to expose class methods as tools.
        """

        @tool
        def write_file(file_path: str, content: str):
            """
            Write code to a specific file in the workspace.
            USe this tool to  create Reat components, package.json, or ML logic files.
            Arguments:
            - file_path: The relative path including filename (e.g., 'src/components/Button.tsx)
            - content: The actual code string to write.
            """
            return self.write_file_logic(file_path, content)
        
        @tool
        def list_files():
            """
            Returns a list of all files currently in the workspace.
            USe this to see what you have already exist.
            """
            return self.list_files_logic()
        
        return [write_file, list_files]
        