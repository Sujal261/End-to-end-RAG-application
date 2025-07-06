import React from 'react';

const ChatbotIcon = () => {
  return (
    <img
      src="buddha.png" // ✅ replace with the path to your actual logo file
      alt="Company Logo"
      width={50}
      height={50}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  );
};

export default ChatbotIcon;
