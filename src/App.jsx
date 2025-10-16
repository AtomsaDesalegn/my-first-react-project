import { useState } from "react";
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/robot.png';
import {Chatbot} from 'supersimpledev';
import "./App.css";

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  function saveInputText(event) {
    setInputText(event.target.value);
  }
    function handleKeyDown(event){
    if(event.key === 'Enter'){
      sendMessage();
    }
  }
  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);
    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setInputText("");
  }
  return (
    <>
      <input
        placeholder="Send a message to Chatbot"
        size="30 "
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}

function ChatMessage({ message, sender }) {
  /*   const message = props.message;
        const sender = props.sender; */

  // const {message, sender} = props;
  /*  */
  return (
    <div>
      {sender === "robot" && <img src={RobotProfileImage} width="50" />}
      {message}
      {sender === "user" && <img src={UserProfileImage} width="50" />}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  return (
    <>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([
    { message: "hello chatbot", sender: "user", id: "id1" },
    {
      message: "Hello!, How can I help you?",
      sender: "robot",
      id: "id2",
    },
    {
      message: "can you get me todays date?",
      sender: "user",
      id: "id3",
    },
    {
      message: "Today is September 27",
      sender: "robot",
      id: "id4  ",
    },
  ]);
  return (
    <>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages chatMessages={chatMessages} />
    </>
  );
}
export default App;
