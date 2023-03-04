import "./profileStyle.css"
import React, { useState } from "react";


export const ProfileCreation = (props) => {
  const [title, setTitle] = useState("");
  const [currentskill, setCurrentskill] = useState('');
  const [skills, setskills] = useState([]);
  const [bio, setBio] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (currentskill.trim()) {
          setskills(prevskills => [...prevskills, currentskill.trim()]);
          setCurrentskill('');
        }
      }
    }
  
    const handleInputChange = (event) => {
      setCurrentskill(event.target.value);
    }

    
    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 id="welcome-msg">Hello, {props.userName}</h2>
                <h3 id="welcome-sub">Tell us know more about yourself.</h3>

                <label htmlFor="Title" >Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Neurologist"></input>

                <label htmlFor="bio">Bio:</label>
                  <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
               
                <div>
                    <label htmlFor="skills-input">Type your skills:</label>
                        <input 
                            id="skills-input"
                            type="text" 
                            value={currentskill} 
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <ul>
                            {skills.map((skill, index) => (
                            <li key={index}>{skill} </li>
                            ))}
                        </ul>
                </div>



                <button className="register-btn" type="submit">Register</button>
                <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Already have an account?</button>
            </form>
        
        </div>

       
    )
}

