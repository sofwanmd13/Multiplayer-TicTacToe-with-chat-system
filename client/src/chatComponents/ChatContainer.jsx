import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import InputText from './InputText';
import ChatBoxReceiver, { ChatBoxSender } from './ChatBox';

const ENDPOINT = "http://localhost:3000";

function ChatContainer({ user, setUser, avatar, setAvatar }) {
    const [chats, setChats] = useState([]);
    const chatListRef = useRef(null);
    const socketio = useRef(null); // Use ref to persist the socket instance across re-renders

    useEffect(() => {
        // Initialize socket connection only when there's a user
        if (user && !socketio.current) {
            socketio.current = socketIOClient(ENDPOINT);
            
            socketio.current.on('chat', (message) => {
                // Update chats with new messages
                setChats(prevChats => [...prevChats, message]);
            });
        }

        // Cleanup function to disconnect socket when component unmounts or user logs out
        return () => {
            if (socketio.current) {
                socketio.current.disconnect();
                socketio.current = null;
            }
        };
    }, [user]); // Reinitialize socket connection on user change

    const sendChatToSocket = (chat) => {
        if (socketio.current) {
            socketio.current.emit("chat", chat);
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
