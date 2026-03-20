"""
Here we will test the functionality of the Brain class, which is responsible for managing the overall 
state and flow of the agent's operations. We will create unit tests to ensure that the Brain can correctly initialize, 
update its state, and execute tasks as expected.
"""

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..')) # Add the parent directory to the system path to import from src
from src.agents.graph import app

def check_flow():
    # Initial input to start the 'Intern'
    initial_state = {
        "messages": ["Start project: Build an LMS Dashboard"],
        "figma_data": {},
        "generated_code": {},
        "errors": [],
        "current_task": "Initialize",
        "is_complete": False
    }

    print("🧠 Starting the Agentic Brain...")

    # Run the graph
    for output in app.stream(initial_state):
        for key, value in output.items():
            print(f"--- Finished Step: {key} ---")
            print(value["messages"][-1])

if __name__ == "__main__":
    check_flow()