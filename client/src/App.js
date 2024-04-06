import React, { useState, useEffect } from 'react';
import './App.css';
import TicTacToe from './gameComponents/TicTacToe';
import ChatContainer from './chatComponents/ChatContainer';
import UserLogin from "./chatComponents/UserLogin";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

  useEffect(() => {
    // Additional logic for user state changes could go here, if necessary
  }, [user, avatar]);

  if (!user) {
    // User is not logged in, show only the login form
    return <UserLogin setUser={setUser} />;
  }

  // Main application content, shown only after user has logged in
  return (
    <div className="app-container">
      <div className="tictactoe-container">
        <TicTacToe />
      </div>
      <div className="chat-display">
        <ChatContainer user={user} setUser={setUser} avatar={avatar} setAvatar={setAvatar} />
      </div>
    </div>
  );
}

export default App;
