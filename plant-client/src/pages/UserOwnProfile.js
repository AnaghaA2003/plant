import React, { useEffect, useState } from 'react'
import './userOwnprofile.css'
import NavBar from '../components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UserOwnProfile() {
  const [userProfile, setUserProfile] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('loginId'))
    const token = localStorage.getItem('token');
    console.log("token==>", token);

    console.log("id==>", id);

    axios.get(`http://localhost:5000/api/user/profile-view/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data.data);
      setUserProfile(res.data.data)

    }).catch((error) => {
      console.error("Error fetching data:", error);
      // Optional: Show an error message to the user
    });

  }, [])

  const userEdit = (id) => {
    console.log("userid==>", id);
    navigate(`/userEdit/${id}`)

  }
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      <NavBar /><br></br><br></br>
      <>

        <div className="userCard">
          <div className="profile-pic">

            <img src={userProfile?.user_img} style={{
              fill: "#fff8f6",
              fillOpacity: 1,
              fillRule: "nonzero",
              stroke: "none"
            }} height={"666.66669"} width={"666.66669"}></img>

          </div>
          <div className="bottom">
            <div className="content">
              <span className="name">{userProfile?.Name}</span>
              <span className="about-me">
                {userProfile?.Age}<br></br>
                {userProfile?.Address} <br></br>
                {userProfile?.loginId?.email} <br></br>
                {userProfile?.Mobile}
              </span>
            </div>
            <div className="bottom-bottom">

              <button className="userButton" onClick={() => {
                userEdit(userProfile._id)
              }}>Edit Profile</button>
            </div>
          </div>
        </div>
      </>

    </div>
  )
}
