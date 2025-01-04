import { getAIResponse } from './ai.js';

// Create and inject the chat interface
function createChatInterface() {
  const container = document.createElement('div');
  container.id = 'shop-assistant';
  container.style.cssText = `
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 300px;
    height: 400px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 9999;
    display: none;
    font-family: Arial, sans-serif;
  `;
  
  container.innerHTML = `
    <div style="padding: 16px; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
        <h3 style="margin: 0;">Shop Shutup</h3>
        <button id="close-chat" style="border: none; background: none; cursor: pointer;">×</button>
      </div>
      <div id="chat-messages" style="
        flex-grow: 1;
        overflow-y: auto;
        margin-bottom: 16px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 4px;
      "></div>
      <div style="display: flex; gap: 8px;">
        <input type="text" id="chat-input" placeholder="Type your message..." style="
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          outline: none;
        ">
        <button id="send-message" style="
          padding: 8px 16px;
          background: #0066cc;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">Send</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(container);
  
  let messageHistory = [
    { role: 'assistant', content: "Hi! I'm your shopping assistant. How can I help you find the perfect product?" }
  ];

  // Add message to chat
  function addMessage(text, isUser = false) {
    const messagesDiv = container.querySelector('#chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      margin: 8px 0;
      padding: 8px 12px;
      border-radius: 16px;
      max-width: 80%;
      ${isUser ? 
        'background: #0066cc; color: white; margin-left: auto;' : 
        'background: white; border: 1px solid #ddd;'}
    `;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Add message to history
    messageHistory.push({
      role: isUser ? 'user' : 'assistant',
      content: text
    });
  }

  // Handle sending messages
  async function handleSendMessage() {
    const input = container.querySelector('#chat-input');
    const message = input.value.trim();
    if (message) {
      addMessage(message, true);
      input.value = '';
      
      // Show typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.textContent = "Typing...";
      typingDiv.style.cssText = `
        margin: 8px 0;
        padding: 8px 12px;
        color: #666;
        font-style: italic;
      `;
      container.querySelector('#chat-messages').appendChild(typingDiv);
      
      try {
        // Get AI response
        const response = await getAIResponse(messageHistory);
        typingDiv.remove();
        addMessage(response);
      } catch (error) {
        console.error('Chat Error:', error); // Debug log
        typingDiv.remove();
        addMessage("Sorry, I encountered an error. Please try again.");
      }
    }
  }

  // Event listeners
  container.querySelector('#send-message').addEventListener('click', handleSendMessage);
  container.querySelector('#chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
  container.querySelector('#close-chat').addEventListener('click', () => {
    container.style.display = 'none';
  });

  return container;
}

// Initialize
let chatContainer = null;

// Listen for toggle message from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);  // Debug log
  
  if (message.action === "ping") {
    sendResponse(true);
    return;
  }
  
  if (message.action === "toggle") {
    if (!chatContainer) {
      console.log('Creating chat interface');  // Debug log
      chatContainer = createChatInterface();
    }
    
    chatContainer.style.display = 
      chatContainer.style.display === 'none' ? 'block' : 'none';
    console.log('Chat visibility:', chatContainer.style.display);  // Debug log
    
    sendResponse({ success: true });
  }
  
  // Required for async response
  return true;
});

console.log('Content script loaded');  // Debug log 