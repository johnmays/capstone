import React, { useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./login/Register";
import "./login/loginStyle.css"
import { ProfileCreation } from "./profile/ProfileCreation";


const App = () => {


    const[currentForm, setCurrentForm] = useState('login');
    const[userName, setUserName] = useState('');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    } 

    const getUserName = (userName) => {
        setUserName(userName);
    }


    return(
        <div className="App">
            {
                currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : 
                currentForm === 'register' ? <Register onFormSwitch={toggleForm} userName={getUserName}/> : 
                currentForm === 'profile-creation' ? <ProfileCreation onFormSwitch={toggleForm} userName={userName}/> : null
            }
            
        </div>
    );
}

export default App;