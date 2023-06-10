import React, { useState, useEffect} from "react";
import "./CourseListingsStyle.css";
import axios from "axios";

export const CourseList = (props) => {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [url, setUrl] = useState(`http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getCourse/field/%20`);
  const [profileData, setProfileData] = useState([]);

  /*
  const viewProfile = (id) => {
    props.onFormSwitch("profile-view");
    props.setUserId(id);
  }  */

  useEffect(() => {
    axios
        .get(url)
        .then(response => setData(response.data))
        .catch(error => console.log(error));
  }, []);

  function handleSearchButtonPress() {
    setUrl(`http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getCourse/field/${searchField}`);
    axios
        .get(url)
        .then(response => setData(response.data))
        .catch(error => console.log(error));
  }

  function getProfileData(profileID) {
    axios
        .get(`http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/${profileID}`)
        .then(response => setProfileData(response.data))
        .catch(error => console.log(error));
  }

  return (
    <div>
      <div id="bkg-profile-view">
      <div id="searchbar" class="contianer-fluid">
      <h1>Course Search</h1>
        <div id="search-container">
            <div id="search-button" onClick={(e) => handleSearchButtonPress()}>
                <h3>Search</h3>
            </div>
            <input value={searchField} onChange={(e) => setSearchField(e.target.value)} id="field" placeholder="Search"></input>
        </div>
      </div>
        <ul>
          {data.map(course => (
            <li key={course.course_id}>
              <div id="course-bar" class="contianer-fluid">
                <div id="course-box" class="contianer-fluid">
                <div id="course-info">
                    <h1>{course.title}</h1>
                    <h3>{course.field}, {course.cost_per_session} Per Session</h3>
                    <br></br>
                    <h3>Description:</h3>
                    <p>{course.description}</p>
                </div>
                <div id ="profile-contianer">
                    <h2><center>Firstname Lastname</center></h2>
                    <img id="prof-img" src="https://physics.oregonstate.edu/sites/physics.oregonstate.edu/files/styles/882_x_662/public/2023-01/Profile-thumbnail-02.jpg?h=232d5ff5&itok=rY2gJsEm"></img>
                    <div id="badge-cont">
                        <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/e/e5/Boy_Scouts_of_America_corporate_trademark.svg" ></img>
                        <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/World_Scout_Emblem_1955.svg/1200px-World_Scout_Emblem_1955.svg.png" ></img>
                        <img class="badge" src="https://upload.wikimedia.org/wikipedia/en/0/0c/Boy_Scouts_of_the_Philippines.svg" ></img>
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
  
 