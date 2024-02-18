import './App.css';
import TicTacToe from './gameComponents/TicTacToe';
import Chat from './chatComponents/Chat';

function App() {
  return (
    <div className="app-container">
      <div className="tictactoe-container">
        <TicTacToe />
      </div>
      <div className="chat-container">
        <Chat />
      </div>
    </div>
  );
}

export default App;
