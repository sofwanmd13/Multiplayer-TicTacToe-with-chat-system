import { Avatar, Image } from 'antd';
import '../App.css';

export default function ChatBoxReceiver({ avatar, user, message }) {
    return (
        <div className="chatBoxReceiver">
            <div className="custom-avatar">
                <Avatar
                    src={<Image src={avatar} preview={false} />}
                />
            </div>
            <p>
                <strong>{user}</strong> <br></br>
                <div className="messageContent">{message}</div>            
            </p>
        </div>
    );
}

export function ChatBoxSender({ avatar, user, message }) {
    return (
        <div className="chatBoxSender">
            <p>
                <strong>{user}</strong> <br></br>
                <div className="messageContent">{message}</div>            
            </p>
            <div className="custom-avatar">
                <Avatar
                    src={<Image src={avatar} preview={false} />}
                />
            </div>
        </div>
    );
}
