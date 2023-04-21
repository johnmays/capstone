import "./profileCreationStyle.css";
import axios from 'axios';
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ProfileCreation = (props) => {
  const [title, setTitle] = useState("");
  const [currentSkill, setCurrentSkill] = useState('');
  const [Skills, setSkills] = useState([]);
  const [bio, setBio] = useState([]);
  const [location, setLocation] = useState("");
  const locationRef = useRef(null);
  const [image, setImage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const locState = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    const options = {
      componentRestrictions: { country: 'us' }, 
      types: ['postal_code', 'locality', 'administrative_area_level_1']
    };
    
    const autocomplete = new window.google.maps.places.Autocomplete(locationRef.current, options);
    autocomplete.addListener("place_changed", () => {
      setLocation(autocomplete.getPlace().formatted_address);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  
    if (!location) {
      alert("location is a required field");
    }

    const names = locState.state.name.split(" ");
    const address = location.split(",");
    const stateZip = address[1].trim().split(" ");
          
    const user = {
      first_name: names[0],
      middle_initial: "",
      last_name: names[1],
      profile_img: image,
      bio: bio,
      city: address[0],
      state: stateZip[0],
      zip: stateZip[1],
      skills: Skills,
      title: title,
    };
  
    let data = JSON.stringify(user);
    console.log(data);
  
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
        props.setUserId(response.data.user_id);
        navigate('/profile/'+ response.data.user_id);
      })
      .catch((error) => {
        console.log(error);
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
        addSkill();
      }
    }

    const addSkill = () => {
      if (currentSkill.trim()) {
        setSkills(prevSkills => [...prevSkills, currentSkill.trim()]);
        setCurrentSkill('');
      }
    };

    return (
      <div id="gradient-bkg">
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 id="welcome-msg">Hello, {locState.state.name}</h2>
                <h3 id="welcome-sub">Tell us more about yourself.</h3>
              
                <label htmlFor="Title" >Title:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Neurologist"></input>

                <label htmlFor="bio">Bio:</label>
                  <textarea id="bio"  value={bio} onChange={(e) => setBio(e.target.value)} />
               
                  <div>
                    <label htmlFor="skills-input">Type your skills: </label>
                    <input 
                      id="skills-input"
                      type="text"
                      value={currentSkill} 
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button type="button" id="add-skill" onClick={(e) => { e.preventDefault(); addSkill() }}>add</button>
                    <ul id="listed-skills">
                      {Skills.map((Skill, index) => (
                        <li key={index}>
                          {Skill} 
                          <button type="button" onClick={() => setSkills(prevSkills => prevSkills.filter((_, i) => i !== index))}>remove</button>
                        </li>
                      ))}
                    </ul>
                </div>

                <div>
                  <label htmlFor="loc">Location: </label>
                  <input className={submitted && !location ? "empty" : ""} ref={locationRef} placeholder="zip city, state, country" value={location} onChange={(e) => setLocation(e.target.value)} />
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

      </div>

    )
}

