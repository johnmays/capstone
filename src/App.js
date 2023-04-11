import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import { Login } from "./login/Login";
import { Register } from "./login/Register";
import { ProfileCreation } from "./profile/ProfileCreation";
import { ProfileView } from "./profile/ProfileView";
import { ProfileList } from "./listings/ProfileList";
import { CourseList } from "./listings/CourseList";


const App = () => {

    const[userName, setUserName] = useState('');
    const[userEmail, setUserEmail] = useState('');
    const[userId, setUserId] = useState('');

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
            <Route path="/login" element={ <Login/> }/>
            <Route path="/register" element={ <Register/> }/>
            <Route path="/createprofile" element={ <ProfileCreation/> }/>
            <Route path="/courses" element={ <CourseList/> }/>
            <Route path="/profiles" element={ <ProfileList/> }/>
            {/*<Route path="/profile/:id" element={ <ProfileView/> }/> eventually: dynamic route for individual profiles*/}
        </Routes>
    );
}

export default App;