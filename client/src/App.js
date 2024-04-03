import './App.css';
import TicTacToe from './gameComponents/TicTacToe';
import ChatContainer from './chatComponents/ChatContainer';
import UserLogin from "./chatComponents/UserLogin";

function App() {
  return (
    <div className="app-container">
      <div className="tictactoe-container">
        <TicTacToe />
      </div>
      <div className = "chat-display">
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;
