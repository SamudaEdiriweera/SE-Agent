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

class FileSystemTool:
    def __init__(self, base_path="workspace"):
        self.base_path = base_path
        # Ensure the workspace exists
        if not os.path.exists(self.base_path):
            os.makedirs(self.base_path)

    def write_file(self, file_path: str, content: str):
        """ Write code to a specific file in the workspace."""
        full_path = os.path.join(self.base_path, file_path) # Combine base path with the provided file path

        # Create directories if they don't exist
        os.makedirs(os.path.dirname(full_path), exist_ok=True) # Create the directory structure if it doesn't exist

        with open(full_path, "w") as f: # Open the file for writing
            f.write(content)

        # INDUSTRY STANDARD: Log this 'action' to MLflow for traceability
        mlflow.log_text(content, f"genreated_files/{file_path}") # Log the generated file content to MLflow for traceability
        print(f"📂 Created file: {full_path}")
        return f"Successfully wrote to {file_path}"
    
    def list_files(self):
        """ Allows the AI to see what it has built so far"""
        files_list = [] # Initialize an empty list to store file paths
        for root, dirs, files  in os.walk(self.base_path): # Walk through the base directory and its subdirectories
            for file in files: # Iterate through each file found
                files.append(os.path.relpath(os.path.join(root, file), self.base_path)) # Append the relative path of the file to the files_list
        return files_list # Return the list of file paths
        