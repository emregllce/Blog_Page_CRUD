import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import blok from "../assets/blok.png";
import { useState,useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditBlog } from "../helpers/firebase";
import {
  toastSuccessNotify,
} from "../helpers/toastNotify";



export default function UpdateBlog() {
  

  const params = useParams()
 
  const location = useLocation()
  const blog = location.state.blog
  const initialValues = {
    title : blog?.title, url: blog?.url, 
    content : blog?.content, id:params.id,
    owner : blog?.owner, printTime : blog?.printTime}
    
  const [updatedBlog, setUpdatedBlog] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
   setUpdatedBlog(initialValues)
  }, []);

  const handleChange = (e) =>{
    e.preventDefault();  
    const{name,value} = e.target
    setUpdatedBlog({...updatedBlog, [name]:value})
    // console.log(updatedBlog);
  }
  
  
  const handleEditBlog = (e) => {
    try {
      e.preventDefault();
      EditBlog(updatedBlog)
      toastSuccessNotify("updated succesfully")
      navigate(-1)
      console.log(updatedBlog);
      
    } catch (error) {
      console.log("error", updatedBlog);
    }

    
  }





  return (
    <div
      style={{
        background: "url(https://picsum.photos/2000/1200)",
        position: "absolute",
        top: "60px",
        left: "0",
        bottom: "-50",
        right: "0",
      }}
    >
      <Box
        onSubmit={handleEditBlog}
        component="form"
        sx={{
          width: "fit-content",
          height: "auto",
          border: "1px solid",
          margin: "auto",
          marginTop: "50px",
          padding: "30px 50px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          alignItems: "center",

          "& > :not(style)": { m: 1, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <img
          style={{
            borderRadius: "50%",
            background: "rgb(4, 101, 130)",
            width: "200px",
          }}
          src={blok}
          alt="blok"
        />
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontFamily: "Girassol", fontSize: "30px" }}>
            ── Update Blog ──
          </h3>
        </div>
        
        <TextField
          id="outlined-basic"
          type= "text"
          name="title"
          defaultValue={blog?.title}
          required
          multiline
          onChange={handleChange}
          />
        <TextField
          id="outlined-basic2"
          name="url"
          defaultValue={blog?.url}
          multiline
          required
          onChange={handleChange}
          />
       <TextField
          id="outlined-multiline-static"
          name="content"
          defaultValue={blog?.content}
          required
          multiline
          rows={8}
          onChange={handleChange}

        />
        <button
        type="submit"
          style={{
            width: "48.5ch",
            height: "5ch",
            backgroundColor: "rgb(4, 101, 130)",
            color: "white",
            cursor:"pointer"
          }}
        >
          UPDATE
        </button>
      
      </Box>
    </div>
  );
}
