
import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }


    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name" >full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Joe Shmoe"></input>

                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" placeholder="abc123@email.com"/>

                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} id="password" name="password" type="password" placeholder="********"/>

                <button className="login-btn" type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Already have an account?</button>
            

        </div>

       
    )
}