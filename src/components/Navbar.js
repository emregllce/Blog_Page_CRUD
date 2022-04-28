import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import cwLogo from "../assets/cw.jpeg";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { logOut } from "../helpers/firebase";

export default function Navbar() {

  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    logOut()
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
    
      }}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            background: "rgb(4, 101, 130)",
          }}
        >
          <img
            onClick={() => navigate("/")}
            style={{ width: "40px", cursor: "pointer" }}
            src={cwLogo}
            alt=""
          />

          <Typography
            sx={{
              fontFamily: "Girassol",
              fontSize: 30,
              "& span": {
                color: "wheat",
              },
            }}
            variant="h6"
            component="div"
          >
            <Link style={{ textDecoration: "none" }} to={"/"}>
              {" "}
              <span>───{"<Emregllce/>"}───</span>
              <p style={{ display: "inline", color: "white" }}>BLOG</p>
            </Link>
          </Typography>

          <div>
            <IconButton
              size="larger"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {currentUser ?
              (<div>
              <Link
                style={{ textDecoration: "none", color: "grey" }}
                to="/profile"
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "grey" }}
                to="/newblog"
              >
                <MenuItem onClick={handleClose}>New Blog</MenuItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "grey" }}
                to="/login"
              >
                <MenuItem onClick={handleClose2}>Log Out</MenuItem>
              </Link>    
              </div> )
              :
              (
              <div>
                <Link
                  style={{ textDecoration: "none", color: "grey" }}
                  to="/login"
                  >
                  <MenuItem onClick={handleClose}>Log In</MenuItem>
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "grey" }}
                  to="/register"
                  >
                  <MenuItem onClick={handleClose}>Register</MenuItem>
                </Link>
              </div> )  }   
            </Menu>



          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


