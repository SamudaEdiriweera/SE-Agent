import os
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class MemoryBank:
    def __init__(self):
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.index_name = "ai-intern-memory"

        # Create a Pinecone index if it doesn't exist
        if self.index_name not in self.pc.list_indexes().names():
            self.pc.create_index(
                name=self.index_name,
                dimension=1536, # Standard for OpenAI text-embedding-3-small model
                metric="cosine",
                spec=ServerlessSpec(cloud='aws', region='us-east-1')
            )

        self.index = self.pc.Index(self.index_name)

    def get_embedding(self, text: str):
        """ Convers text into a vector"""
        return self.openai.embeddings.create(
            input=[text],
            model="text-embedding-3-small"
        ).data[0].embedding
    
    def store_memory(self, text: str, metadata: dict):
        """ Saves a code snippet or doc to Pinecone with its embedding and metadata. """
        vector = self.get_embedding(text)
        # unique ID based on metadata name or hash
        vector_id = metadata.get("name", str(hash(text))) # Generate a unique ID for the vector, using the 'name' from metadata or a hash of the text as a fallback
        self.index.upsert(vectors=[(vector_id, vector, metadata)]) # Upsert the vector into the Pinecone index with its ID and metadata

    def query_memory(self, prompt: str, top_k=3):
        """ Retrieves the most relevant memories based on cosine similarity. """
        query_vector = self.get_embedding(prompt)
        results = self.index.query(vector=query_vector, top_k=top_k, include_metadata=True)
        return [match['metadata'] for match in results['matches']] # Return the metadata of the top matching vectors as relevant memories

