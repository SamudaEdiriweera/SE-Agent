from src.utils.tracker import AgentTracker

class MemoryNode:
    def __init__(self, MLflow_tracker: AgentTracker):
        self.tracker = MLflow_tracker

    def __call__(self, state):
        print("🧠 Memory Node: Archiving final design pattern to Pinecone...")

        #1. Get the figma component name
        figma_name = state.get('figma_data', {}).get('name', 'Unknown_Component')

        # 2. Extract the generated code
        # We look for the most recent code generated in the state
        generated_files = state.get('generated_code', {})

        if generated_files:
            # We take the content of the first file (e.g., App.tsx) to store as reference
            first_file_content = list(generated_files.values())[0]
        else:
            first_file_content = "No code generated."

        # 3. Archive it using our shared tracker service
        # This uses the SHA-256 hashing logic we built earlier
        self.tracker.save_to_long_term_memory(
            figma_summary=f"Component: {figma_name}",
            generated_code=first_file_content,
            task_name=state.get('current_task', 'Unknown_Task')
        )

        return {"messages": ["Memory: Successfully archived the design pattern."]}