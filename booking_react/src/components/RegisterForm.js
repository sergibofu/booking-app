import { FormControl, Button, InputGroup, Alert } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlane, faBed, faGlobeEurope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import axios from 'axios';

function RegisterForm({setUser, baseURL}) {
    const [params, setParams] = useState({email: '', password: ''});
    const [alert, setAlert] = useState(false);

    const showDangerAlert = () => {
        setAlert(true);
    }

    const handleEmailChange = (event) =>{
            let password = params.password;
            setParams({email: event.target.value, password: password});
    }

    const handlePasswordChange = (event) =>{
        let email = params.email;
        setParams({email: email, password: event.target.value});
}
    const sendRegister = (event) => {
        axios.post(baseURL + '/auth/register', params)
        .then((response)=>{
            console.log(response.data);
            let status = response.data.status;
            if(status != 'success'){
                refreshRegister();
                showDangerAlert();
                return;
            }
            let data = response.data.data;
            let user = {
                date: data.date,
                email: data.email,
                token: data.token,
                _id: data._id,
                loggedIn: false,
                registered: true
            };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);     
            
        })
        .catch((err)=>{
            refreshRegister();
            showDangerAlert();
        });
    }

    const refreshRegister = () => {
        setParams({email: '', password: ''});
    }

    return (
        <div class="registerFormContainer">

            <div class="registerForm">
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
                <Button onClick={sendRegister} className="registerBtn" variant="primary" size="lg">Register</Button>
                <Alert className='mt-3' variant='danger' hidden={!alert}>Se ha producido un error, intentelo de nuevo mas tarde</Alert>
            </div>
        
        </div>
        
    )
}

export default RegisterForm;