import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import "./stylesApp.css"
import { useReducer } from "react"

const App = () => {

    const[currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    } 

    return(
        <div className="App">
            {
                currentForm === "register" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
            }
            
        </div>
    );
}

export default App;