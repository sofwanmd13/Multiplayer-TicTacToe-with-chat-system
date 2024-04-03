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

    return ( 
    <div className="textContainer">
        <textarea 
        className="textArea"
        rows={6}
        placeholder = "Type your message here..."
        value = {message}
        onChange = {e => setMessage(e.target.value)}
        >
        </textarea>
        <button className = "textButton"
            onClick = {() => addNewMessage()}
        >
            <span className="buttonContent">SEND</span>
            <img src={sendIcon} alt="Send" className="buttonIcon" />
        </button>
    </div> 
    );
};