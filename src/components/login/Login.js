import React, {useState} from "react";
import Input from "../../elements/Input";
import Button from "../../elements/Button";


const Login = () => {


    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const loginProcess = () => {

        if(username == 'antony' && password == 'antony'){
            
            sessionStorage.setItem('auth', username)
            setTimeout(() => {
                window.location.href = 'user'
            }, 2000)
        }

    }


    return (
        <div className="login-wrapper">
            <p> Login</p>
            <div className="login-content">
                <Input name='username' class="" value={username} onChangeText={(e) => setUsername(e.target.value)} />
                <Input name='password' class="" value={password} onChangeText={(e) => setPassword(e.target.value)} />
                <Button name='login' class="" label="Login" onChangeButton={loginProcess} />
            </div>
        </div>
    )

}

export default Login
