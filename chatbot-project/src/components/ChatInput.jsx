import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages}){
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }


  async function sendMessage(){
    const newChatMessages = [
      //we are saving the data to add it later
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];
    
    setChatMessages(newChatMessages) //this adds the input given by user otherwise it will be overwritten

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages, //now this already has user input as added by setChatMessages earlier
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText(''); //As inputText is called this will set new value to empty

  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30" 
        onChange = {saveInputText}
        onKeyDown = {(event) => {
          event.key == 'Enter' ? sendMessage() : 
            (event.key=='Escape' && setInputText(''))
        }}
        value={inputText}
        className = "chat-input"
      />
      <button 
        onClick={sendMessage}
        className = "send-button"
      >Send</button>
    </div>
    
  );
}