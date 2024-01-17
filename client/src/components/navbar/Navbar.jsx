import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { googleLogout } from '@react-oauth/google';

import explore from '../../assets/explore.png';
import navStyles from './styles';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const profile = useSelector(state => state.userReducer.data);

  console.log(profile);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(profile);
    if(profile) {
      setUser(profile.data);
      navigate('/', { replace: true});
      localStorage.setItem('profile', JSON.stringify(profile.data));
      localStorage.setItem('token', JSON.stringify(profile.token));
    }
  }, [profile]);

  const logout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    navigate('/', { replace: true });
  }

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
                className='classes.purple' alt={user?.name} src={user?.picture}
              >
                {user?.name?.charAt[0]}
              </Avatar>
              <Typography
                className={classes.userName}
                variant='h6'
              >
                {user?.name}
              </Typography>
              <Button 
                variant="contained"
                className={classes.logout}
                color='secondary'
                onClick={logout}
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