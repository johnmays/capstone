import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./profileViewStyle.css";
import axios from 'axios';
import Map from './Map';

export const ProfileView = (props) => {
    const [userData, setData] = useState({ skills: [] });
    const { id } = useParams() // will return id element in URL
    const navigate = useNavigate();

    useEffect(() => {
        const url = "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/" + props.userId;
        axios.get(url)
          .then(response => {
            const newData = response.data;
            setData(newData);
          })
          .catch(error => console.log(error));
      }, []);

      const handleHamburgerClick = () => {
        navigate("/profiles");
    };

    return (
        <div id="bkg-profile-view">
            <img onClick={handleHamburgerClick} id="hamburger" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hamburger_icon_white.svg/1024px-Hamburger_icon_white.svg.png?20190820131613"></img>
            
            <div id="header-bkg">
                <div id="profile-header">
                    <div>
                        <img id="prof-img" src="https://via.placeholder.com/350x150"></img>
                    </div>
                    
                    <div id="header-info">
                        <h1>{userData.first_name + " " + userData.last_name}</h1>
                        <h3>Neurologist</h3>
                        <h3>{userData.email}</h3>
                        <h3>Phone: +1 111-111-1111</h3>
                    </div>

                    <div>
                        <h1>Courses Completed</h1>
                        <div id="badge-cont">
                            <img className="badge" src="https://upload.wikimedia.org/wikipedia/en/e/e5/Boy_Scouts_of_America_corporate_trademark.svg" ></img>
                            <img className="badge" src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/World_Scout_Emblem_1955.svg/1200px-World_Scout_Emblem_1955.svg.png" ></img>
                            <img className="badge" src="https://upload.wikimedia.org/wikipedia/en/0/0c/Boy_Scouts_of_the_Philippines.svg" ></img>
                        </div>
                    </div>
                </div>
            </div>

            <div id="personal-info">
                <div className="section">
                    <h3 className="section-header">My skills include:</h3>
                    <ul id="listed-skills">
                        {userData.skills.map((Skill, index) => (
                        <li key={index}>
                            {Skill} 
                        </li>
                        ))}
                    </ul>
                </div>

                <div className="section" id="bio-cont"> 
                    <h3 className="section-header">My Bio:</h3>
                    <p >{userData.bio}</p>
                </div>
                
                <div className="section" id="location-sec"> 
                    <h3 className="section-header">My Location: {userData.zip + " " + userData.city + ", " + userData.state}</h3>
                    <Map zip="44106" city="Cleveland" state="Ohio" />
                </div>

            </div>
        
            <div id="v-courses-container" >
                <h1> Course Offerings</h1>

                <div id="v-course-body">
                    <div id="v-course-labels">
                        <h3>Title</h3>
                        <h3>Address</h3>
                        <h3>Time</h3>
                    </div>
                    
                    <div id="v-course-listings"> 
                    <ul>
                        <li className="v-course">Course 1</li>
                        <li className="v-course">Course 2</li>
                        <li className="v-course">Course 3</li>
                        <li className="v-course">Course 4</li>
                        <li className="v-course">Course 5</li>

                    </ul>

                    </div>
                </div>
            </div>
            {/*
                <div id="edit-profile-cont">
                <div className="section" id="edit-profile-button">
                    <h1>Edit Profile</h1>
                </div>
            </div>  
            */}
             
        </div>
    )
    } 
