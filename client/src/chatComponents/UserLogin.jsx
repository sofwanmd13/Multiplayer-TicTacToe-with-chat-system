import { useState } from 'react';
import { CommentOutlined } from '@ant-design/icons'
import _ from 'lodash';

function UserLogin({setUser}) {

    const [user, setNewUser] = useState("");

    function handleSetUser(){
        if (!user) {
            return
        }
        localStorage.setItem("user", user );
        setUser(user);
        localStorage.setItem("avatar", `https://avatar.iran.liara.run/public/${_.random(1,100)}`);
    }

    return ( 
    <div>
        <h1 className="login-title"><CommentOutlined color={'green'}/>Chat</h1>
        <div className="login-container">
            <input className="user-input"
                value={user}
                onChange={e=> setNewUser(e.target.value)}
                placeholder="Enter a username"
            ></input>
            <button className="loginButton"
                onClick={()=> handleSetUser()}
            >
                Login
            </button>
        </div>
    </div> 
    );
}

export default UserLogin;