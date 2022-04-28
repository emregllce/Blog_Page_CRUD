import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { useState,useContext } from 'react';
import { blogDelete, ReadBlog } from '../helpers/firebase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/toastNotify";







export default function Details() {
  const params = useParams()
  const {blog} = ReadBlog(params.id)
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate()
  // console.log("details", blog,params.id);

  const deleteTheBlog = () => {
    if (currentUser?.email === blog?.owner){
    blogDelete(params.id,navigate)
    toastSuccessNotify("blog deleted")
    }else{
      navigate("/")
      toastErrorNotify("only the owner can delete the blog")
    }
  }
  
  const editHandler = () => {
    if (currentUser?.email === blog?.owner){

    navigate(`/updateblog/${params.id}`, {state: {blog}})
    }else{
      navigate("/")
      toastWarnNotify("only the owner can update the blog")
    }
    
  }
 
  return (
    <div>
      
    <Card sx={{ width: 445, height:"auto", margin:"auto", marginTop:"50px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width:"70px", height:"70px" }} aria-label="recipe">
            {blog?.title[0]}
          </Avatar>
        }
        
        title={<h2>{blog?.title}</h2>}
        subheader={<h3>{blog?.printTime}</h3>}
      />
      <CardMedia
        component="img"
        height="194"
        image={blog?.url}
        alt={blog?.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog?.content}
        </Typography>
      </CardContent>
      <Typography sx={{display:"flex", margin:"5px 0 0 15px"}}>
        <AccountCircleIcon />
        <span style={{fontSize:"1.1rem", fontWeight:"700", marginLeft:"10px"}}>{blog?.owner}</span>
        </Typography>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
        
      </CardActions>
    </Card>

        <div style={{width:445 , display:"flex", justifyContent:"space-evenly",margin:"auto", marginTop:"10px"}}>
          <Button onClick={deleteTheBlog} variant="outlined" color='error' startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button onClick={ () => editHandler(
            params.id,
            blog.title,
            blog.url,
            blog.content
          )}
            variant="outlined" startIcon={<UpdateOutlinedIcon />}>
            Update
          </Button>
        </div>

    </div>
  );
}
