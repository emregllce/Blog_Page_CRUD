import React from 'react'
import LoadingGif from "../assets/loading.gif"

const Loading = () => {
  return (
    <div style={{width:"150px", margin:"auto", marginTop:"50px"}}>
        <img src={LoadingGif} alt="" />
    
    </div>
  )
}

export default Loading