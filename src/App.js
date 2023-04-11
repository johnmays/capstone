import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import { Login } from "./login/Login";
import { Register } from "./login/Register";
import { ProfileCreation } from "./profile/ProfileCreation";
import { ProfileView } from "./profile/ProfileView";
import { ProfileList } from "./listings/ProfileList";
import { CourseList } from "./listings/CourseList";


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
        <Routes>
            <Route path="/" element={ <Login/> }/>
            <Route path="/og" element={
                <div className="App">
                {
                    currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : 
                    currentForm === 'register' ? <Register onFormSwitch={toggleForm} setUserName={getUserName} setUserEmail={getUserEmail}/> : 
                    currentForm === 'profile-creation' ? <ProfileCreation setUserId={getUserId} onFormSwitch={toggleForm} userName={userName} userEmail={userEmail}/> : 
                    currentForm === 'profile-view' ? <ProfileView onFormSwitch={toggleForm} userId={userId} /> :
                    currentForm === 'profile-list' ? <ProfileList setUserId={getUserId} onFormSwitch={toggleForm}/> :
                    currentForm === 'course-list' ? <CourseList onFormSwitch={toggleForm}/> : null
                }
                
                </div>
            }/>

            <Route path="/login" element={ <Login/> }/>
            <Route path="/register" element={ <Register/> }/>
            <Route path="/createprofile" element={ <ProfileCreation/> }/>
            <Route path="/courses" element={ <CourseList/> }/>
            <Route path="/profiles" element={ <ProfileList/> }/>
            {/*<Route path="/profile" element={ <ProfileList/> }/> no good way to do profiles yet*/}
        </Routes>
    );
}

export default App;