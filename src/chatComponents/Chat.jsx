import NameBox from "./NameBox";
import DisplayBox from "./DisplayBox";
import TypingBox from "./TypingBox";

function Chat() {
    return(
        <div className="chat">
            <NameBox />
            <DisplayBox />
            <TypingBox />
        </div>
    );
}

export default Chat;