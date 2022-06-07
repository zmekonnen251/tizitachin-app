import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar,Avatar,Toolbar,Typography ,Button} from '@mui/material';
import classes from './styles.js';
import memories from '../../images/memories.png';

const Navbar = () => {
  const user = null;
  return (
      <AppBar sx={classes.appBar} position="static" color="inherit">
        <div sx={classes.brandContainer}>
           <Typography sx={classes.heading} component={NavLink} to='/' variant="h2" align="center" >
             Memories
           </Typography>
            <img sx={classes.image} src={memories} alt="memories" height="60" />
        </div>
        <Toolbar sx={classes.toolbar}>
          {user?(
            <div sx={classes.profile}>
              <Avatar sx={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography sx={classes.userName}>{user.result.name}</Typography>
              <Button variant='contained' color='secondary' sx={classes.logout}>Logout</Button>
            </div>
          ):(
            <Button component={NavLink} to='/auth' variant='contained' color='primary'>Sign in</Button>
          )}
        </Toolbar>
      </AppBar>
  )
}

export default Navbar;