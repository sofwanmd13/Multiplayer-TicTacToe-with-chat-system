import { useState } from 'react';
import { FiSend } from 'react-icons/fi'; // Import the send (arrow) icon
import { IoMdHappy } from 'react-icons/io'; // Import an emoji icon
import Picker from 'emoji-picker-react'; // Ensure you have this installed for the emoji picker

function TypingBox() {
    const [showPicker, setShowPicker] = useState(false);
    const [message, setMessage] = useState("");

    const onEmojiClick = (event, emojiObject) => {
        setMessage(prevInput => prevInput + emojiObject.emoji);
    };

    return (
        <div className="typing-box">
            {showPicker && (
                <Picker 
                  onEmojiClick={onEmojiClick} 
                  pickerStyle={{ position: 'absolute', bottom: '50px', right: '0px', boxShadow: 'none', backgroundColor: 'transparent' }} 
                />
            )}
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="emoji-picker-button" onClick={() => setShowPicker(val => !val)}>
                    <IoMdHappy />
                </button>
            </div>
            <button className="send-button">
                <FiSend />
            </button>
        </div>
    );
}

export default TypingBox;