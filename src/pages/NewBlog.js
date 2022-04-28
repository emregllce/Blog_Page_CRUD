import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import blok from "../assets/blok.png";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AddBlog } from "../helpers/firebase";
import { AuthContext } from "../contexts/AuthContext";
import {
  toastSuccessNotify
} from "../helpers/toastNotify";



export default function NewBlog() {

  const {currentUser} = useContext(AuthContext);

  var currentdate = new Date();
  var today = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear()
  console.log(today,currentUser?.email);

  const initialValues = {title : "", url: "", content : "", printTime:today, owner:currentUser?.email}

  const [blogAdded, setBlogAdded] = useState(initialValues)


  // const [title, setTitle] = useState()
  // const [url, setUrl] = useState()
  // const [content, setContent] = useState()
  const navigate = useNavigate()

  const handleChange = (e) =>{
    e.preventDefault();
    const{name,value} = e.target
    setBlogAdded({...blogAdded, [name]:value})
  }
  
  const handleAddBlog = (e) => {
    e.preventDefault();
    AddBlog(blogAdded,navigate)
    toastSuccessNotify("blog added succesfully")

 


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
            ── New Blog ──
          </h3>
        </div>
        
        <TextField
          id="outlined-basic"
          type= "text"
          name="title"
          label="Title"
          value={blogAdded.title}
          variant="outlined"
          required
          onChange={handleChange}
          />
        <TextField
          id="outlined-basic2"
          name="url"
          value={blogAdded.url}
          label="Image URL"
          variant="outlined"
          required
          onChange={handleChange}
          />
       <TextField
          id="outlined-multiline-static"
          name="content"
          label="Content"
          value={blogAdded.content}
          required
          multiline
          rows={8}
          onChange={handleChange}
        />
        <button
          type="submit"
          onClick={handleAddBlog}
          style={{
            width: "48.5ch",
            height: "5ch",
            backgroundColor: "rgb(4, 101, 130)",
            color: "white",
            cursor:"pointer"
          }}
        >
          SUBMIT
        </button>
       
      
      </Box>
    </div>
  );
}
