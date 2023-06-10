import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminStyle.css";

export const AdminLogin = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setSubmitted(true);

        if (!email || !pass) {
            let missingFields = [];
            if (!email) missingFields.push("email");
            if (!pass) missingFields.push("password");
            alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
          }
        e.preventDefault();
    }


    return (
        <div id="bkg">
             <div className="auth-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Admin Login</h2>

                    <label htmlFor="email">email</label>
                    <input className={submitted && !email ? "empty" : ""} value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" placeholder="example@email.com"/>

                    <label htmlFor="password">password</label>
                    <input className={submitted && !pass ? "empty" : ""} value={pass} onChange={(e) => setPass(e.target.value)} id="password" name="password" type="password" placeholder="********"/>

                    <button className="login-btn" type="submit" onClick={()=>navigate('/Admin')}>Log In</button>
                </form>
            </div>
        </div>
       

       
    )
}