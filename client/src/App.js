import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import SocketContext from './SocketContext';
import './App.css';
import TicTacToe from './gameComponents/TicTacToe';
import ChatContainer from './chatComponents/ChatContainer';
import UserLogin from "./chatComponents/UserLogin";

const ENDPOINT = "http://localhost:3000";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [socket, setSocket] = useState(null); // Changed from useRef to useState

  useEffect(() => {
    if (user && !socket) {
      // Initialize socket connection only when there's a user and no socket initialized yet
      const newSocket = socketIOClient(ENDPOINT);
      setSocket(newSocket); // Set the new socket

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]); // Dependency on user to re-evaluate the effect when user changes

  if (!user) {
    return <UserLogin setUser={setUser} />;
  }

  return (
    <SocketContext.Provider value={socket}> {/* Provide the socket instance directly */}
      <div className="app-container">
        <div className="tictactoe-container">
          <TicTacToe />
        </div>
        <div className="chat-display">
          <ChatContainer user={user} setUser={setUser} avatar={avatar} setAvatar={setAvatar} />
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
