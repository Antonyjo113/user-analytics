import React, {useState} from "react";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import LoginService from "../../services/LoginService";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


const Login = () => {


    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const navigate = useNavigate()

    const SignupProcess = () => {
        navigate(`/signup`)
    }

    const loginProcess = async () => {

        try {
            const loginData = {
                'email': username,
                'password': password
            }
            const response = await LoginService.userLogin(loginData)
            const authtoken = response.user['auth']
            const useremail = response.user['email']

                Cookies.set('authToken', authtoken, { expires: 1/24 }); 
                Cookies.set('userEmail', useremail, { expires: 1/24 });

            setTimeout(() => {
                window.location.href = 'user'
            }, 2000)

            
        } catch (error) {
            console.log("Loggin Error", error);
        }

    }


    return (
        <div className="login-wrapper">
            <div className="login-content">
                <p className="login-title">Login</p>
                <Input
                name="username"
                className="login-input"
                value={username}
                placeholder="Enter Psername"
                onChangeText={(e) => setUsername(e.target.value)}
                />
                <Input
                name="password"
                className="login-input"
                value={password}
                placeholder="Enter Password"
                onChangeText={(e) => setPassword(e.target.value)}
                />
                <Button
                name="login"
                className="login-button"
                label="Login"
                onChangeButton={loginProcess}
                />
                <p>If not have account / <button onClick={SignupProcess}> Sign Up</button></p>

            </div>
        </div>
    )

}

export default Login
