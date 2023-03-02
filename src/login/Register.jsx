
import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

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
        else props.onFormSwitch("profile-creation", {name});
    }


    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Registration</h2>

                <label htmlFor="name" >full name</label>
                <input className={submitted && !name ? "empty" : ""} value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Joe Shmoe"></input>

                <label htmlFor="email">email</label>
                <input className={submitted && !email ? "empty" : ""} value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="abc123@email.com"/>

                <label htmlFor="password">password</label>
                <input className={submitted && !pass ? "empty" : ""} value={pass} onChange={(e) => setPass(e.target.value)} id="password" type="password" placeholder="********"/>

                <button className="login-btn" type="submit" onClick={() => props.userName(name)}>Register</button>
                <button type="button" className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account?</button>
            </form>
        </div>   
    )
}