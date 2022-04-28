import React, { useContext } from 'react'
import DashboardStyle from './DashboardStyle'
import { ReadBlogs } from '../helpers/firebase';
import Loading from './Loading';
import "./Dashboard.css";
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import {
  toastWarnNotify,
} from "../helpers/toastNotify";




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  display: "flex",
  justifyContent:"center",
}));



const Dashboard = () => {
  const navigate = useNavigate()
  const {isLoading, blogList} = ReadBlogs()
  const {currentUser} = useContext(AuthContext);

  const handleCardClick = (id) => {
    if (currentUser) {
      navigate(`/details/${id}`)
    }
    else{
      navigate("/login")
      toastWarnNotify("Please login to see details")
    }
  }
  
  
  return (
    <div>
      
    <div style={{textAlign:"center"}}>
    
      <span style={{fontFamily:"Girassol", fontSize:"40px", color:"rgb(4, 101, 130)"}} >───Dashboard───</span>
    </div>


<Box sx={{marginLeft:"20px"}}>
  <Grid  container spacing={{ xs: 1, md: 2, lg:5, xl:9 }}>
  {isLoading
     ? (<Loading />)
     :
  blogList?.map((blog) => (
    <Grid style={{cursor:"pointer"}} onClick={()=>handleCardClick(blog.id)} item xs={6} md={4} lg={4} xl={3} key={blog.id}>
    <DashboardStyle blog = {blog} />                         
     </Grid>
        ))}
      </Grid>
    </Box>
    
    </div>
  )
}

export default Dashboard