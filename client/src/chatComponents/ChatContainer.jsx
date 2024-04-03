import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import UserLogin from "./UserLogin";
import InputText from './InputText';
import ChatBoxReceiver, { ChatBoxSender } from './ChatBox';

const ENDPOINT = "http://localhost:3000";

function ChatContainer() {
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
    const chatListRef = useRef(null);
    const socketio = useRef(null); // useRef to persist the socket instance

    useEffect(() => {
        // Initialize socket connection only when there's a user and if socket.io instance hasn't been created yet
        if (user && !socketio.current) {
            socketio.current = socketIOClient(ENDPOINT);

            socketio.current.on('chat', (message) => {
                // Update chats with new messages
                setChats((prevChats) => [...prevChats, message]);
            });

            // Emit an event to join a user-specific or a general room
            // socketio.current.emit("joinRoom", { user, avatar });
        }

        return () => {
            if (socketio.current) {
                socketio.current.disconnect();
                socketio.current = null; // Ensure to reset the socketio reference to null
            }
        };
    }, [user]); // Depend on the user state to re-initialize socket connection on user change

    const sendChatToSocket = (chat) => {
        // Ensure socketio.current is not null before attempting to emit
        if (socketio.current) {
            socketio.current.emit("chat", chat);
        }
    };

    const addMessage = (chat) => {
        const newChat = {...chat, user, avatar};
        // Don't setChats here to avoid duplicating messages that will come from the server
        sendChatToSocket(newChat);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        setUser("");
        // Logout handling is done in useEffect cleanup
    };

    return (
        <div className = "chat-container">
            {user ? (
                <div>
                    <div className="header-panel">
                        <h1>Chat</h1>
                        <div className="logOutButton-container">
                            <button className="logOutButton" onClick={logout}>Log Out</button>
                        </div>
                    </div>
                    <div className="chatList-container" ref={chatListRef}>
                        {chats.map((chat, index) => chat.user === user ? (
                            <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
                        ) : (
                            <ChatBoxReceiver key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
                        ))}
                    </div>
                    <InputText addMessage={addMessage} />
                </div>
            ) : (
                <UserLogin setUser={setUser} />
            )}
        </div>
    );
}

export default ChatContainer;
