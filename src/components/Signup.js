import React, {useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const Signup = (props) => {
    const [errorMsg, changeMessage] = useState("");
    async function signupUser(event) {
        try {
            event.preventDefault();
            const response = await axios.post("http://localhost:8080/users", {
                "email": event.target.email.value,
                "password": event.target.password.value
            });
            console.log(response);
            if(response && response.data && response.data.token) {
                changeMessage("");
                const date = new Date();
                date.setTime(date.getTime() + (100*24*60*60*1000));
                document.cookie = `token=${response.data.token};expires=${date}`;
                props.history.push(`\login`);
            } else if(response && response.data && response.data.error) {
                changeMessage(response.data.error);
            }
        } catch(ex) {
            console.log(ex);
        }
    }
    return (
        <React.Fragment>
            <Header/>
            <form className="login-form" onSubmit={signupUser}>
            <h2>Signup</h2>
                <input className="form-input" name="email" type="text" placeholder="Email"/>
                <input className="form-input" name="password" type="password" placeholder="password"/>
                <button className="form-submit" type="submit" >Register</button>
                <p className="error-message">{errorMsg}</p>
            </form>
            
        
        </React.Fragment>
    )
}

export default Signup;