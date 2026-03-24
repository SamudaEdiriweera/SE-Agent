"""
Figma Design-to-Data Interface (The "Agent's Eyes")

What this tool does:
1. DESIGN RETRIEVAL: Connects to the Figma REST API to fetch live design data 
   directly from a Figma URL using a Personal Access Token.
   
2. DOM PARSING: Extracts the Document Object Model (DOM) of a specific UI component, 
   capturing exact coordinates, dimensions, colors, and typography settings.

3. DATA NORMALIZATION (Noise Reduction): Figma's raw JSON response is massive (often 10,000+ lines). 
   This tool filters out non-essential metadata, leaving only the "Design Tokens" 
   required for a developer to write CSS/React code.

4. ACCURACY ENFORCEMENT: By providing structured JSON instead of just a screenshot, 
   it prevents the AI Agent from "hallucinating" styles and ensures the generated 
   web application is pixel-perfect to the original Figma design.
"""

import os
import json
import requests
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

class FigmaTool:
    def __init__(self, cache_dir="data/figma_cache"):
        self.access_token = os.getenv("FIGMA_ACCESS_TOKEN") # Load the Figma Personal Access Token from environment variables
        self.base_url = "https://api.figma.com/v1"
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(parents=True, exist_ok=True)

    def get_file_nodes(self, file_key: str, node_ids: list):
        """ 
        Fetches specific components/frames from a Figma file.
        """

        # Create a unique filename for this specific request
        node_id_str = "_".join(node_ids).replace(":", "-")
        cache_file = self.cache_dir / f"{file_key}_{node_id_str}.json"

        # 1. Check if we have this in cache
        if cache_file.exists():
            print(f"📦 Loading design from Local Cache: {cache_file}")
            with open(cache_file, "r") as f:
                return json.load(f)
            
        # 2. If not in cache, call the API (Only if we have requests left)
        print(f"🌐 Calling Figma API (Careful: Limited requests!)...")   
        headers = {
            "X-Figma-Token": self.access_token # Figma Personal Access Token for authentication
        }
        ids_csv = ",".join(node_ids) # Convert list of node IDs to comma-separated string
        url = f"{self.base_url}/files/{file_key}/nodes?ids={ids_csv}" # API endpoint to fetch specific nodes from a Figma file

        response = requests.get(url, headers=headers) # Make the GET request to Figma API

        if response.status_code == 200:
            data = response.json()
            # 3. SAVE TO CACHE IMMEDIATELY
            with open(cache_file, "w") as f:
                json.dump(data, f, indent=2)
            print(f"✅ Design saved to cache for future use.")
            return data # Return the JSON response containing the requested nodes
        else:
            raise Exception(f"Figma API Error: {response.status_code} - {response.text}") # Raise an exception if the API call fails
        
    def simplify_node(self, node_data):
        """
        Industry Standard: 'Data Normalization'. 
        We strip away 90% of the Figma junk and keep only what a Coder needs.
        """

        # This is a simplified example; you can expand this to get colors/fonts/etc.
        document = node_data.get("document", node_data)
        simplified = {
            "name": document.get("name"),
            "type": document.get("type"),
            "style": document.get("style", {}),
            "absoluteBoundingBox": document.get("absoluteBoundingBox", {}),
        }
    
        # Recursively get children if they exist
        if "children" in document:
            simplified["children"] = [self.simplify_node(child) for child in document["children"]]
            
        return simplified