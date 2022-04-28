import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import blok from "../assets/blok.png";
import google from "../assets/google.png";
import { useState } from "react";
import { createUser } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleRegister = () =>{
    createUser(email,password,navigate);
  }

  return (
    <div
      style={{
        background: "url(https://picsum.photos/2000/1200)",
        position: "absolute",
        top: "8vh",
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
          marginTop: "100px",
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
            ── REGISTER ──
          </h3>
        </div>
        
        <TextField
          id="outlined-basic"
          type={"email"}
          label="Email"
          variant="outlined"
          required
          error
          onChange={(e)=>setEmail(e.target.value)}
          helperText="Email is required"
        />
        <TextField
          id="outlined-basic2"
          label="Password"
          variant="outlined"
          type={"password"}
          required
          error
          onChange={(e)=>setPassword(e.target.value)}
          helperText="Password is required"
        />
        <button
          type="button"
          onClick={handleRegister}
          style={{
            width: "48.5ch",
            height: "5ch",
            backgroundColor: "rgb(4, 101, 130)",
            color: "white",
          }}
        >
          REGISTER
        </button>
        <button
          style={{
            width: "48.5ch",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "700" }}>WITH</span>{" "}
          <img
            style={{ width: "70px", marginLeft: "10px" }}
            src={google}
            alt=""
          />
        </button>
      
      </Box>
    </div>
  );
}
