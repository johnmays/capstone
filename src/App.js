import React, { useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./login/Register";
import { ProfileCreation } from "./profile/ProfileCreation";
import { ProfileView } from "./profile/ProfileView";


const App = () => {

    const[currentForm, setCurrentForm] = useState('login');
    const[userName, setUserName] = useState('');
    const[userEmail, setUserEmail] = useState('');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    } 

    const getUserName = (userName) => {
        setUserName(userName);
    }

    const getUserEmail = (userEmail) => {
        setUserEmail(userEmail);
    }

    return(
        <div className="App">
            {
                currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : 
                currentForm === 'register' ? <Register onFormSwitch={toggleForm} userName={getUserName} userEmail={getUserEmail}/> : 
                currentForm === 'profile-creation' ? <ProfileCreation onFormSwitch={toggleForm} userName={userName} userEmail={userEmail}/> : 
                currentForm === 'profile-view' ? <ProfileView onFormSwitch={toggleForm}/> : null
            }
            
        </div>
    );
}

export default App;