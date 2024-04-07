import { useEffect, useContext, useState, useRef } from "react";
import SocketContext from '../SocketContext.js'; // Import the context
import InputText from './InputText';
import ChatBoxReceiver, { ChatBoxSender } from './ChatBox';

function ChatContainer({ user, setUser, avatar, setAvatar }) {
    const socket = useContext(SocketContext); // Access the socket from context
    const [chats, setChats] = useState([]);
    const chatListRef = useRef(null);
    //const socketio = useRef(null); // Use ref to persist the socket instance across re-renders

    useEffect(() => {
        if (socket) {
          socket.on('chat', (message) => {
            // Handle chat messages
            setChats(prevChats => [...prevChats, message]);
          });
    
          // Clean up event listener
          return () => {
            socket.off('chat');
          };
        }
    }, [socket]);

    const sendChatToSocket = (chat) => {
        if (socket) {
            socket.emit("chat", chat);
        }
    };

    const addMessage = (chat) => {
        // Prepare chat message with user and avatar, then emit
        const newChat = { ...chat, user, avatar };
        sendChatToSocket(newChat);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        setUser(null);
        setAvatar(null);
    };

    // Main chat interface
    return (
        <div className="chat-container">
            <div className="header-panel">
                <h1>Chat</h1>
                <div className="logOutButton-container">
                    <button className="logOutButton" onClick={logout}>Log Out</button>
                </div>
            </div>
            <div className="chatList-container" ref={chatListRef}>
                {chats.map((chat, index) => (
                    chat.user === user 
                    ? <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
                    : <ChatBoxReceiver key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
                ))}
            </div>
            <InputText addMessage={addMessage} />
        </div>
    );
}

export default ChatContainer;
