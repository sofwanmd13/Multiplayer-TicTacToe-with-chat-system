import {Avatar, Image} from 'antd';
import '../App.css';

export default function ChatBoxReceiver({avatar, user, message}) {
    return (
        <div className="chatBoxReceiver">
            <Avatar
                size={50}
                src={<Image src={avatar} preview={false}/>}
            />
            <p>
                <strong> {user} </strong> <br></br>
                {message}
            </p>
        </div>
    );
}

export function ChatBoxSender({avatar, user, message}) {
    return (
        <div className="chatBoxSender">
            <p>
                <strong> {user} </strong> <br></br>
                {message}
            </p>
            <Avatar
                size={50} 
                src={<Image src={avatar} preview={false}/>}
            />
        </div>
    );
}
