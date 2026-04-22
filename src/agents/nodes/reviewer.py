from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv("config/.env") # Load environment variables from the .env file

class ReviewerNode:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0)

    def __call__(self, state):
        print("Reviewer Node: Validating generated code...")

        last_message = state['messages'][-1]

        prompt = f"""
        Review the following code for bugs, Tailwindcss errors, or missing logic.
        CODE TO REVIEW:
        {last_message}

        If the code is perfect, respond with 'PASSED'.
        If there are issues, provide specific feedback on what to fix.
        """

        response = self.llm.invoke(prompt)
        return {"messages": [response]}