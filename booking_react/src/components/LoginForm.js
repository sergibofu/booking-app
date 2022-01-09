import { FormControl, Button, InputGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlane, faBed, faGlobeEurope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import axios from 'axios';

function LoginForm({setUser}) {
    const [params, setParams] = useState({email: '', password: ''});

    const handleEmailChange = (event) =>{
            let password = params.password;
            setParams({email: event.target.value, password: password});
    }

    const handlePasswordChange = (event) =>{
        let email = params.email;
        setParams({email: email, password: event.target.value});
}
    const sendLogin = (event) => {
        axios.post('http://localhost:3001/auth/login', params)
        .then((response)=>{
            let status = response.data.status;
            if(status != 'success'){
                refreshLogin();

                return;
            }
            let data = response.data.data;
            let user = {
                date: data.date,
                email: data.email,
                token: data.token,
                _id: data._id,
                loggedIn: true,
                registered: true
            };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);     
            
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    const refreshLogin = () => {
        setParams({email: '', password: ''});
    }

    return (
        <div class="loginFormContainer">

            <div class="loginForm">
                <div class="thiccFont"> E-mail</div>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="email-addon"><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                    <FormControl onChange={handleEmailChange}
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="email-addon"
                        id="email"
                        value={params.email}
                    />
                </InputGroup>

                <div class="thiccFont"> Password</div>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="password-addon"><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                    <FormControl type="password" onChange={handlePasswordChange}
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        id="password"
                        value={params.password}
                    />
                </InputGroup>
                <Button onClick={sendLogin} className="loginBtn" variant="primary" size="lg">Log In</Button>
            </div>
        
        </div>
        
    )
}

export default LoginForm;