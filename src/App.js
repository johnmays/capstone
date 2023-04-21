import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import { Login } from "./login/Login";
import { Register } from "./login/Register";
import { ProfileCreation } from "./profile/ProfileCreation";
import { ProfileView } from "./profile/ProfileView";
import { ProfileList } from "./listings/ProfileList";
import { CourseList } from "./listings/CourseList";
import { AdminLogin } from "./admin/AdminLogin";
import { Admin } from "./admin/Admin";


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
            <Route path="/register" element={ <Register setUserName={getUserName} setUserEmail={getUserEmail} /> }/>
            <Route path="/createprofile" element={ <ProfileCreation setUserId={getUserId} setUserEmail={getUserEmail} userEmail={userEmail}/>}/>
            <Route path="/courses" element={ <CourseList/> }/>
            <Route path="/profiles" element={ <ProfileList setUserId={getUserId}/> }/>
            <Route path={"/profile/" + userId} element={ <ProfileView userId={userId}/> }/>
            <Route path="/adminlogin" element={ <AdminLogin/> }/>
            <Route path="/admin" element={ <Admin/> }/>
        </Routes>
    );
}

export default App;