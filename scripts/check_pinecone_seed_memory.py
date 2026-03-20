import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..')) # Add the parent directory to the system path to import from src
from src.db.pinecone_client import MemoryBank

def seed():
    memory = MemoryBank()

    # 1. Teach it a standard ML wrapper
    ml_template = """ 
    class CompanyMLWrapper:
        def __init__(self, model_path):
            self.model = load(model_path)
        def predict(self, data):
            return self.model.predict(data)
    """

    print("🧠 Storing ML Template in memory...")
    memory.store_memory(
        ml_template,
        {"type": "code", "name": "ml_wrapper", "framework": "fastapi"}
    )

    # 2. Test searching for it
    print("🔍 Searching memory for 'How do I wrap an ML model?'")
    results = memory.query_memory("How do I wrap an ML model?")
    print("results:", results)

    for res in results:
        print(f"✅ Found Memory: {res['name']}")

if __name__ == "__main__":
    seed()