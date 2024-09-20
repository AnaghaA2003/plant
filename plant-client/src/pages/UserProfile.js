import React, { useEffect, useState } from 'react'
import './userProfile.css'
import axios from 'axios'
import Nav from '../components/Nav'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'


export default function UserProfile() {
  const [user, setUser] = useState([])
  console.log(user);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/adminUser-view").then((res) => {
      console.log(res.data.data);
      setUser(res.data.data);
    
      

    })
    
  }, [])

  console.log("user=>", user);
  const approve = (loginId) => {
    axios.post(`http://localhost:5000/api/admin/approve-user/${loginId}`, user).then((res) => {
      console.log(res);
      toast.success(res.data.message)


    }).catch((error) => {
      console.log(error);
      toast.error(error)

    })
  }
  const reject = (loginId) => {
    axios.post(`http://localhost:5000/api/admin/adminUser-delete/${loginId}`, user).then((res) => {
      console.log(res);
      toast.success(res.data.message)
      const dataFilter = user.filter((value) => {
        return value.loginId._id!=loginId// check alreday ulla  data is equal or not reject button click chyumbol nadakkunnath
         
       
      })
      setUser(dataFilter)//state update chyan function use chyunnu
      console.log("dataFilter==>",dataFilter);
      



    }).catch((error) => {
      console.log(error);
      toast.error(error)


    })
  }

  return (
    <>
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
      <title>plant</title>
      <Nav />
      <Toaster />
      <h1 style={{textAlign:"center"}}>USERS</h1>
      <div className='user-card'>
        {user.map((value, index) => (
          <div className="user-card1 wallet1" key={index}>
            <img src={value.user_img} alt='User Profile' className='profile-image' />
            <div>
              <div className='details' style={{ paddingTop: "190px", textAlign: "center" }}>
                <p><b>{value.Name}</b> <br />
                  <b>{value.Age}</b> <br />
                  <b>{value.Address}</b><br />
                 <b> {value.Mobile}</b>
                </p>
                {value.loginId.status == 'Approved' ?
                  <button  variant="info" style={{ marginTop: "0px", borderRadius: "50px" }} onClick={() => {
                    reject(value.loginId._id)
                  }}>Reject</button>
                  :
                  <div style={{ gap: "10px" }}>

                    <button  variant="info" style={{ marginTop: "0px", borderRadius: "50px" }} onClick={() => {
                      approve(value.loginId._id)
                    }}>Approve</button>

                    <button  variant="info" style={{ marginTop: "0px", borderRadius: "50px" }} onClick={() => {
                      reject(value.loginId._id)
                    }}>Reject</button>
                  </div>


                }


              </div>
              <br />
            </div>
            <div className="overlay"></div>
          </div>
        ))}
      </div><br></br>
      <Footer/>
    </>
  )
}
