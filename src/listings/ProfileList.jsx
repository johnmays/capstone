import React, { useState, useEffect} from "react";
import "./ListingsStyle.css";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

export const ProfileList = (props) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const urls = [
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/985244",
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/33570",
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/874467",
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/304703"
    ];

    const requests = urls.map(url => axios.get(url));
    Promise.all(requests)
      .then(responses => {
        const newData = responses.map(response => response.data);
        setData(newData);
      })
      .catch(error => console.log(error));
  }, []);

  const viewProfile = (id) => {
    props.setUserId(id);
    navigate('/profile/'+ id);
  }

  return (
    <div>
      <div id="bkg-profile-view">
        <ul>
          {data.map(profile => (
            <li key={profile.user_id}>
              <div id="profile-box" class="contianer-fluid">
                <div id="profile-bar" class="contianer-fluid">
                <div>
                    <img id="prof-img" src="https://physics.oregonstate.edu/sites/physics.oregonstate.edu/files/styles/882_x_662/public/2023-01/Profile-thumbnail-02.jpg?h=232d5ff5&itok=rY2gJsEm"></img>
                </div>
                
                <div id="profile-info">
                    <h1>{profile.first_name} {profile.last_name}</h1>
                    <h3>{profile.title}</h3>
                    <h3>{profile.email}</h3>
                    <h3>Phone: insert</h3>
                    <h3>{profile.city}, {profile.state} {profile.zip}</h3>
                </div>

                <div id="courses-container">
            <h1> Course Offerings</h1>

            <div id="course-body">
                <div id="course-labels">
                    <h3>Title</h3>
                    <h3>Address</h3>
                    <h3>Time</h3>
                </div>
                
                <div id="course-listings"> 
                <ul>
                    <li class="course">Course 1</li>
                    <li class="course">Course 2</li>
                    <li class="course">Course 3</li>
                    <li class="course">Course 4</li>
                    <li class="course">Course 5</li>

                </ul>
                </div>
            </div>
            
        </div>
              <div id="end-contianer">
                <div id="badge-cont">
                    <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/e/e5/Boy_Scouts_of_America_corporate_trademark.svg" ></img>
                    <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/World_Scout_Emblem_1955.svg/1200px-World_Scout_Emblem_1955.svg.png" ></img>
                    <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/0/0c/Boy_Scouts_of_the_Philippines.svg" ></img>
                </div>
                <div onClick={() => viewProfile(profile.user_id)} id="view-button">
                  <h2><center>View {profile.first_name}'s Profile</center></h2>
                </div>
                </div>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
  
 