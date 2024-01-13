import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import navStyles from './styles';

import explore from '../../assets/explore.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const classes = navStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div>
        <Typography
          component={Link}
          variant="h2"
          align="center"
          to='/'
          className={classes.heading}
        >
          Explore
        </Typography>
        <img 
          src={explore}
          alt="explores"
          height={60} 
          className={classes.image}
        />
      </div>
      <Toolbar
        className={classes.toolbar}
      >
        {
          user ? (
            <div
              className={classes.profile}
            >
              <Avatar
                className='classes.purple' alt={user?.result?.name} src={user?.result?.imageUrl}
              >
                {user?.result?.name?.charAt[0]}
              </Avatar>
              <Typography
                className={classes.userName}
                variant='h6'
              >
                {user?.result?.name}
              </Typography>
              <Button 
                variant="contained"
                className={classes.logout}
                color='secondary'
              >Logout</Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;