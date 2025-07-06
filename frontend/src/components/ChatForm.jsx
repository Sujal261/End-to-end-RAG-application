import React from 'react';
import { useRef } from "react";

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;

        inputRef.current.value = "";
        const updatedHistory = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(updatedHistory);

    // Call backend to get real response
    generateBotResponse(updatedHistory);
  
    };

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input 
                ref={inputRef} 
                type="text" 
                placeholder="Message...." 
                className="message-input" 
                required
            />
            <button className="material-symbols-rounded">keyboard_arrow_up</button>
        </form>
    );
};

export default ChatForm;