import "./profileStyle.css"
import React, { useState } from "react";


export const ProfileCreation = (props) => {
    const [title, setTitle] = useState("");
    //const [skills, setSkills] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const [currentAnswer, setCurrentAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (currentAnswer.trim()) {
          setAnswers(prevAnswers => [...prevAnswers, currentAnswer.trim()]);
          setCurrentAnswer('');
        }
      }
    }
  
    const handleInputChange = (event) => {
      setCurrentAnswer(event.target.value);
    }

    
    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 id="welcome-msg">Hello, {props.userName}</h2>
                <h3 id="welcome-sub">Tell us know more about yourself.</h3>

                <label htmlFor="Title" >Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Neurologist"></input>

               
                <div>
                    <label htmlFor="answers-input">Type your answers:</label>
                        <input 
                            id="answers-input"
                            type="text" 
                            value={currentAnswer} 
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <ul>
                            {answers.map((answer, index) => (
                            <li key={index}>{answer} </li>
                            ))}
                        </ul>
                </div>



                <button className="register-btn" type="submit">Register</button>
                <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Already have an account?</button>
            </form>
            
            

        </div>

       
    )
}

