import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




export default function DashboardStyle({blog}) {







  return (
    <Card sx={{ maxWidth: 350, marginTop:"30px", paddingTop:"20px"}}>
      <CardMedia
        component="img"
        height="194"
        image={blog.url}
        alt={blog.title}
      />

      <CardHeader
        
   
        title={blog.title}
        subheader={blog.printTime}
      />
      <CardContent>
        <Typography style={{minHeight:"150px"}} variant="body2" color="text.secondary">
          {blog.content}
        </Typography>
        <Typography sx={{display:"flex", marginTop:"5px"}}>
        <AccountCircleIcon />
        <span style={{fontSize:"1.1rem", fontWeight:"700", marginLeft:"10px"}}>{blog.owner}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
       
       
      </CardActions>
     
    </Card>
  );
}

