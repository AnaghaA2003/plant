import React from 'react'
import './care.css'


export default function CareTips() {
  return (
    <div>
       <div className="container text-center">
        <div className="row align-items-start">
          <div className="col ">
            <img src="/img/plant care.jpeg" alt="" height="200%" />
          </div>
    
    <div className="col colCare" >
            <h3 style={{ color: "rgb(114, 151, 59)" }}>
              <b>
                <i>CARE TIPS</i>
              </b>
            </h3>
            <ul className='careUl'> 
              <li>
                After recieveing the plants open the box 📦 as soon as possible .
              </li>
              <br />
              <li>⁠Air dry the plants for 2-3 hours on fresh air .</li>
              <br />
              <li>
                Plant in well drained soil . ( 30%sand + 30% soil + 20% vermicompost
                + 20% perlite ) .
              </li>
              <br />
              <li>
                {" "}
                ⁠Water plants after 2-3 days and don’t give direct sunlight to newly
                planted succulents for at least 10 days .
              </li>
              <br />
              <p>
                <b>Notes:</b>Always water succulents when top layer of soil feels
                dry in roots of plant rather than leaves .
              </p>
              <br />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
