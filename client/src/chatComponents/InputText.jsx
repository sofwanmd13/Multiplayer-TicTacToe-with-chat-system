import {useState} from "react";
import sendIcon from '../send-icon.svg';

export default function InputText({addMessage}) {

    const [message, setMessage] = useState('');

    function addNewMessage(){
        if(message.trim() !==''){
            addMessage({message})
            setMessage('')
        }
    }

    function handleKeyDown(e) {
        // Check if Enter is pressed without the Shift key
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default Enter behavior (i.e., adding a new line)
            addNewMessage();
        }
    }

    return ( 
    <div className="inputContainer">
        <textarea 
        className="textArea"
        rows={6}
        placeholder = "Type your message here..."
        value = {message}
        onChange = {e => setMessage(e.target.value)
        }
        onKeyDown={handleKeyDown}
        >
        </textarea>
        <button className = "textButton"
            onClick = {() => addNewMessage()}
        >
            <img src={sendIcon} alt="Send" className="buttonIcon" />
        </button>
    </div> 
    );
};