import React, { useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./login/Register";
import { ProfileCreation } from "./profile/ProfileCreation";
import { ProfileView } from "./profile/ProfileView";
import { ProfileList } from "./listings/ProfileList";


const App = () => {

    const[currentForm, setCurrentForm] = useState('login');
    const[userName, setUserName] = useState('');
    const[userEmail, setUserEmail] = useState('');
    const[userId, setUserId] = useState('');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    } 

    const getUserName = (name) => {
        setUserName(name);
    }

    const getUserEmail = (email) => {
        setUserEmail(email);
    }

    const getUserId = (id) => {
        setUserId(id);
    }

    return(
        <div className="App">
            {
                currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : 
                currentForm === 'register' ? <Register onFormSwitch={toggleForm} setUserName={getUserName} setUserEmail={getUserEmail}/> : 
                currentForm === 'profile-creation' ? <ProfileCreation setUserId={getUserId} onFormSwitch={toggleForm} userName={userName} userEmail={userEmail}/> : 
                currentForm === 'profile-view' ? <ProfileView onFormSwitch={toggleForm} userId={userId} /> :
                currentForm === 'profile-list' ? <ProfileList setUserId={getUserId} onFormSwitch={toggleForm}/> : null
            }
            
        </div>
    );
}

export default App;