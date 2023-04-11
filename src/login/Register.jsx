
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!email || !pass || !name) {
            let missingFields = [];
            if (!email) missingFields.push("email");
            if (!pass) missingFields.push("password");
            if (!name) missingFields.push("name");
            alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
          }
        else{
            //props.onFormSwitch("profile-creation", {name});
            //<Navigate to='/createprofile'/>
            //, state={name}
            navigate('/createprofile', {state:{name:'fart'}})
        } 
    }

    const passNameEmail = () => {
        props.setUserName(name);
        props.setUserEmail(email);
    }

    return (
        <div id="gradient-bkg">
            <div className="auth-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Registration</h2>

                    <label htmlFor="name" >full name</label>
                    <input className={submitted && !name ? "empty" : ""} value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Joe Shmoe"></input>

                    <label htmlFor="email">email</label>
                    <input className={submitted && !email ? "empty" : ""} value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="example@email.com"/>

                    <label htmlFor="password">password</label>
                    <input className={submitted && !pass ? "empty" : ""} value={pass} onChange={(e) => setPass(e.target.value)} id="password" type="password" placeholder="********"/>

                    <button className="login-btn" type="submit" onClick={() => passNameEmail()}>Register</button>
                    <button type="button" className="link-btn" onClick={() => navigate('/login')}>Already have an account?</button>
                </form>
            </div>
        </div>       
    )
}