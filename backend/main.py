from fastapi import FastAPI 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from buddhaair_chatmodel import get_answer


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins =["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message:str

@app.post("/chat")
def chat_endpoint(msg:Message):
    response = get_answer(msg.message)
    return {"response":response}