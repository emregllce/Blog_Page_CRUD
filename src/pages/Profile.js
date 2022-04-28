import React from 'react'
import styles from "./Profile.module.css"


const Profile = () => {
  return (
    <div className={styles.master}>
      
      
      <div className={styles.container}>
        <h1>About Software Developer <span className="emre">EmreGllce</span></h1>
      </div>  
      <div className={styles.bottomContainer}>
          <h3 className={styles.descText}>
          Hi, I'am Emre <br/>
          I’m currently learning Full-Stack Development Languages<br/>
          I know JS, ReactJS, Django, NodeJS, MongoDB,SQL, Python, AWS Services<br/>
          <span>Send email</span> : emregllce@gmail.com
          </h3>
      </div>
        
       
       
    </div>
  )
}

export default Profile