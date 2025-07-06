

from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
import pandas as pd
from langchain.schema import Document
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

df = pd.read_csv("cleaned_answers.csv")

documents = [
    Document(
        page_content = f"Q:{row['Question']}\nA:{row['Answer']}",
        metadata = {"source":"FAQ"}

    )
    for _,row in df.iterrows()
]

# loader = CSVLoader(file_path="cleaned_answers.csv", source_column ="Question")
# documents = loader.load()

documents

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1000,
    chunk_overlap = 200
)

content =[]
for doc in documents:
  content.append(doc.page_content)

chunks = text_splitter.create_documents(content)

len(chunks)

embeddings = OpenAIEmbeddings(model ="text-embedding-3-small" )
vector_store = FAISS.from_documents(chunks,embeddings)

retriever = vector_store.as_retriever(search_type = 'similarity', search_kwargs = {"k":4})

llm = ChatOpenAI(model = "gpt-4o-mini", temperature = 0.2)

prompt = PromptTemplate(
    template = """
    You are a friendly and helpful virtual assistant for an airline.

Below is some information from the company's FAQ knowledge base. Use it to answer the customer’s question in a helpful and conversational tone.

If the answer is not found in the information provided, respond with: "I'm sorry, I couldn't find that information in our FAQ. Please try contacting our customer support."

FAQ Information:
----------------
{context}

Customer's Question:
--------------------
{question}

Assistant's Response:
    """,
    input_variables=['context', 'question']
)



def format_docs(retrieved_docs):
  context_text = "\n\n".join(doc.page_content for doc in retrieved_docs)
  return context_text

parallel_chain = RunnableParallel({
    'context':retriever | RunnableLambda(format_docs),
    'question':RunnablePassthrough()
})

parser = StrOutputParser()

main_chain = parallel_chain | prompt | llm | parser

def get_answer(user_question:str)->str:
  print(f"[LangChain] Question received: {user_question}")
  return main_chain.invoke(user_question)
