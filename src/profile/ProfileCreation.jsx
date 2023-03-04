import "./profileStyle.css"
import React, { useState, useRef, useEffect } from "react";

export const ProfileCreation = (props) => {
  const [title, setTitle] = useState("");
  const [currentSkill, setCurrentSkill] = useState('');
  const [Skills, setSkills] = useState([]);
  const [bio, setBio] = useState([]);
  const [location, setLocation] = useState("");
  const locationRef = useRef(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(locationRef.current);
    autocomplete.addListener("place_changed", () => {
      setLocation(autocomplete.getPlace().formatted_address);
    });
  }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (currentSkill.trim()) {
          setSkills(prevSkills => [...prevSkills, currentSkill.trim()]);
          setCurrentSkill('');
        }
      }
    }

    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 id="welcome-msg">Hello, {props.userName}</h2>
                <h3 id="welcome-sub">Tell us know more about yourself.</h3>
              
                <label htmlFor="Title" >Title:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Neurologist"></input>

                <label htmlFor="bio">Bio:</label>
                  <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
               
                  <div>
                    <label htmlFor="skills-input">Type your skills: </label>
                    <input 
                      id="skills-input"
                      type="text" 
                      value={currentSkill} 
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <ul id="listed-skills">
                      {Skills.map((Skill, index) => (
                        <li key={index}>
                          {Skill} 
                          <button onClick={() => setSkills(prevSkills => prevSkills.filter((_, i) => i !== index))}>x</button>
                        </li>
                      ))}
                    </ul>
                </div>

                <div>
                  <label htmlFor="loc">Location: </label>
                  <input ref={locationRef} value={location} onChange={(e) => setLocation(e.target.value)} />
                  <button id="loc-select" type="submit">Select</button>
               </div>

               <div id="image-input">
                <div>
                  <label htmlFor="pic">Profile Picture:</label>
                  <input id="choose-file" type="file" onChange={handleImageUpload} />
                </div>
                {image && (
                  <div>
                    <img id="profile-pic" src={image} alt="uploaded image" />
                  </div>
                )}
              </div>
              
                <button className="register-btn" type="submit">Register</button>
            </form>
        
        </div>

       
    )
}

