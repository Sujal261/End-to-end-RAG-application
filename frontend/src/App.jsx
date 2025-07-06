import React from 'react';
import { useState, useEffect } from "react"
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"

const App = () => {
const [chatHistory, setChatHistory] = useState([]);
const generateBotResponse = async (history) => {
const lastUserMessage = history[history.length - 1].text;


setChatHistory(prev => [...prev, { role: "bot", text: "..." }]);

try {
const res = await fetch("http://localhost:8000/chat", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ message: lastUserMessage }),
});

const data = await res.json();


setChatHistory(prev => {
const newHistory = [...prev];
if (newHistory.length && newHistory[newHistory.length - 1].role === "bot" && newHistory[newHistory.length - 1].text === "...") {
newHistory[newHistory.length - 1] = { role: "bot", text: data.response };
} else {
newHistory.push({ role: "bot", text: data.response });
}
return newHistory;
});
} catch (error) {
console.error("Error fetching bot response:", error);

setChatHistory(prev => {
const newHistory = [...prev];
if (newHistory.length && newHistory[newHistory.length - 1].text === "...") {
newHistory[newHistory.length - 1] = { role: "bot", text: "Sorry, there was an error." };
}
return newHistory;
});
}
};

return (
<div className="container">
<div className="chatbot-popup">
{/* Chatbot Header*/}
<div className="chat-header">
<div className="header-info">
<ChatbotIcon />
<h2 className="logo-text">Buddha Air</h2>
</div>
<button
className="material-symbols-rounded">keyboard_arrow_down</button>


</div>
{/* Chatbot Body*/}
<div className="chat-body">
<div className="message bot-message">
<ChatbotIcon />
<p className="message-text">
hey there how can I help?
</p>
</div>
{chatHistory.map((chat, index)=>(
<ChatMessage key={index} chat={chat}/>
)
)}

</div>
{/* Chatbot Footer*/}
<div className="chat-footer">
<ChatForm chatHistory = {chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
</div>
</div>
</div>
)
}

export default App