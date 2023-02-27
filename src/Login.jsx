
import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }


    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" placeholder="abc123@email.com"/>

                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} id="password" name="password" type="password" placeholder="********"/>

                <button className="login-btn" type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Don't have an account?</button>
            

        </div>

       
    )
}