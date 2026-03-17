import os 
import sys
import json
from dotenv import load_dotenv

sys.path.append(os.path.join(os.path.dirname(__file__), '..')) # Add the parent directory to the system path to import from src
from src.tools.figma_api import FigmaTool

load_dotenv()

def test_connection(): 
    # 1. Setup
    tool = FigmaTool()

    # 2. Get inputs
    file_key = input("Enter your Figma File Key: ").strip()
    node_id = input("Enter the Node ID (e.g., 1:2): ").strip()

    print(f"\n Connecting to Figma API with File Key: {file_key} and Node ID: {node_id}...")

    try: 
        # 3. Fetch Raw Data
        raw_response = tool.get_file_nodes(file_key, [node_id])
        print("\n Raw Figma API Response:")

        # 4. Extract the specifi cnode data
        # The Figma API returns a dictionary where keys are the node IDs
        node_data = raw_response.get("nodes", {}).get(node_id.replace("-", ":"))

        if not node_data:
            print("❌ Could not find that Node ID in this file.")
            return
        
        print(f"✅ Connection Successful!")
        print(f"📦 Node Name: {node_data['document']['name']}")

        # 5. Test our "Simplifier" (The Senior SE part)
        print("\n--- Testing Data Normalization (Simplification) ---")
        simple_version = tool.simplify_node(node_data)
        print(json.dumps(simple_version, indent=2)) # Print the simplified version in a readable format

    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    test_connection()
