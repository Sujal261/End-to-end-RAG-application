# 🛫 Buddha Airlines Chatbot – RAG-Based Virtual Assistant

This is a Retrieval-Augmented Generation (RAG) chatbot that acts as a virtual assistant for **Buddha Airlines**. It uses LangChain and OpenAI models to answer user queries based on a FAQ dataset.

---

## 📚 What It Does

This chatbot:

- Loads and preprocesses a Buddha Airlines FAQ dataset
- Splits text into semantic chunks
- Creates vector embeddings using OpenAI
- Stores them in a FAISS vector store
- Retrieves relevant chunks for a query
- Uses GPT-4o-mini to generate a helpful, conversational response

If no answer is found in the knowledge base, the assistant politely advises the user to contact customer support.

---

## 🧠 Tech Stack

| Layer          | Tools Used                      |
| -------------- | ------------------------------- |
| Language Model | OpenAI GPT-4o-mini              |
| Embeddings     | OpenAI `text-embedding-3-small` |
| Vector Store   | FAISS                           |
| Framework      | LangChain                       |
| Language       | Python                          |
| Data Source    | `cleaned_answers.csv` (FAQ)     |

---

## 📁 Project Structure

```
chatbot/
├── backend/
│   ├── main.py               # LangChain RAG logic
│   └── cleaned_answers.csv   # FAQ dataset
├── frontend/ (optional)
├── venv/                     # Virtual environment (ignored)
├── .gitignore
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/chatbot.git
cd chatbot/backend
```

### 2. Set up virtual environment

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

If you don't have a `requirements.txt`, generate it:

```bash
pip freeze > requirements.txt
```

### 4. Set up environment variables

Create a `.env` file:

```
OPENAI_API_KEY=your-openai-api-key
```

### 5. Run the app (CLI or integrated in FastAPI)

For quick testing, in `main.py`:

```python
print(get_answer("Where can I check my flight status?"))
```

---

## 📝 Example Question

**User:** Where can I check my flight ticket info?

**Assistant:** You can check your flight ticket information on our website by visiting the Ticket Status section. Alternatively, you can also call us at 01 5970900 for assistance.

---

## 🔒 Notes

- Do not commit your `.env` or `venv/` or `node_modules/` folders.
- `.gitignore` should be properly configured to avoid leaking sensitive info.

---

## 🙏 Credits

This chatbot was built using LangChain, OpenAI, and FAISS for **Buddha Airlines** to improve customer service with AI.

