# SE-Agent
uv run scripts/test_figma_tool.py

# Why do i need Embeddings here ?
bcz computers can't undertand words; they only understand numbers.
An embedding turns text into a Vector (a list of numbers). This vector represents the mathematical meaning of text

# Why did i use OpenAi with Pinecone ?
bcz it's "Processor Vs Storage"
OpenAI is the Translator. OpenAI provides the moel that converts your text into those mathematical vectors. I use OpenAI bcz 'text-embedding-3-small' model is currently the best balance of low cost & high intellignece.

# Why did i use pinecone?
Pinecone is a specialized database that can store millions of these vectors & calculate which ones are "closet" to each other in milliseconds.

"I chose Pinecone because it provides a serverless, production-grade vector store that allows the agent to perform Semantic Retrieval. Unlike traditional SQL databases that rely on keyword matching, Pinecone allows the agent to understand the contextual meaning of code snippets using OpenAI Embeddings, which significantly reduces hallucinations."