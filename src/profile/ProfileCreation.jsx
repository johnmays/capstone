import "./profileStyle.css";
import axios from 'axios';
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
    const names = props.userName.split(" ");
    const address = location.split(",");
    const stateZip = address[2].split(" ");
          
    const user = {
      first_name: names[0],
      last_name: names[1],
      email: props.userEmail,
      profile_img: image,
      bio: bio,
      city: address[1],
      state: stateZip[1],
      zip: stateZip[2],
      skills: Skills,
    };
  
    let data = JSON.stringify(user);
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/createUser',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // go to profile view page
      })
      .catch((error) => {
        console.log(error);
        // console.error("There was an error creating the user:", error);
      });
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
                  <label htmlFor="loc">Address: </label>
                  <input ref={locationRef} value={location} onChange={(e) => setLocation(e.target.value)} />
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

