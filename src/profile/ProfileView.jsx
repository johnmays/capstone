import React from 'react';
import "./profileViewStyle.css";
import axios from 'axios';

let userId = "16"; // replace with the ID of the user you want to retrieve
let config = {
  method: 'get',
  url: `http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/${userId}`,
  headers: { 
    'Content-Type': 'application/json'
  }
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    
  })
  .catch((error) => {
    console.log(error);
  });

export const ProfileView = () => {
  return (
    <div id="bkg-profile-view">
        <img id="hamburger" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hamburger_icon_white.svg/1024px-Hamburger_icon_white.svg.png?20190820131613"></img>
        
        <div id="header-bkg">
            <div id="profile-header">
                <div>
                    <img id="prof-img" src="https://via.placeholder.com/350x150"></img>
                </div>
                
                <div id="header-info">
                    <h1>John Doe</h1>
                    <h3>Neurologist</h3>
                    <h3>JohnDoe@gmail.com</h3>
                    <h3>Phone: +1 666-666-6666</h3>
                </div>

                <div id="badge-cont">
                    <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/e/e5/Boy_Scouts_of_America_corporate_trademark.svg" ></img>
                    <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/World_Scout_Emblem_1955.svg/1200px-World_Scout_Emblem_1955.svg.png" ></img>
                    <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/0/0c/Boy_Scouts_of_the_Philippines.svg" ></img>
                </div>

            </div>
        </div>

        <div id="personal-info">
            <div class="section">
                <p>My skills include:</p>
                <ul>
                    <li>Surgery</li>
                    <li>Butterfly knife tricks</li>
                    <li>Belly scratches</li>
                </ul>
            </div>

            <div id="bio-cont"> 
                <p class="section">I'm a doctor who loves slicing people open and tickling their insides</p>
            </div>
            
            <div> 
                <p class="section"> 44106 Cleveland, Ohio</p>
            </div>

        </div>
       
        <div id="courses-container" >
            <h1> Course Offerings</h1>

            <div id="course-body">
                <div id="course-labels">
                    <h3>Title</h3>
                    <h3>Address</h3>
                    <h3>Time</h3>
                </div>
                
                <div id="course-listings"> 
                <ul>
                    <li class="course">How to remove brain</li>
                    <li class="course">How to get fake doctor lisence</li>
                    <li class="course">How to win claw machine everytime (not click bait)</li>
                    <li class="course">Best Belly scratches for beginners</li>
                    <li class="course">Course 5</li>

                </ul>
                </div>
            </div>
            
        </div>  
    </div>
  )
}
