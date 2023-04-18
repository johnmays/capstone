import React, { useState, useEffect} from "react";
import "./adminStyle.css";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

export const Admin = (props) => {
  const [data, setData] = useState([]);

  const viewProfile = (id) => {
    Navigate('/profile/' + id);
    //props.setUserId(id);
  }  

  useEffect(() => {
    const urls = [
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/1",
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/2",
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/3",
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/4",
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/5",
      "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/getUser/id/6"
    ];

    const requests = urls.map(url => axios.get(url));
    Promise.all(requests)
      .then(responses => {
        const newData = responses.map(response => response.data);
        setData(newData);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <div id="bkg">
        <ul>
          {data.map(profile => (
            <li key={profile.user_id}>
              <div id="profile-box" class="contianer-fluid">
                <div id="profile-bar" class="contianer-fluid">
                    <h3>Name: {profile.first_name} {profile.last_name}, Email: {profile.email}, Phone: insert</h3>
                    <h3>Field: insert, Skills: {profile.skills}</h3>
                    <h3>{profile.city}, {profile.state} {profile.zip}</h3>
                </div>
                <div>
                    <h3>Medical Licenese Information: </h3>
                </div>
                <div id="approve-button">
                    <h1>Approve</h1>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
  
 