import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { googleLogout } from '@react-oauth/google';

import explore from '../../assets/explore.png';
import navStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/user';

const Navbar = () => {
  const [user, setUser] = useState(localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null);
  const profile = useSelector(state => state.userReducer.data);
  const error = useSelector(state => state.postsReducer.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(profile) {
      setUser(profile.data);
      navigate('/', { replace: true});
      localStorage.setItem('profile', JSON.stringify(profile.data));
      localStorage.setItem('token', JSON.stringify(profile.token));
    }

    if(error?.message === "jwt expired" && user) {
      console.log('error');
      logOutUser();
      // dispatch(logout());
    }
    // eslint-disable-next-line
  }, [profile, error]);

  

  const logOutUser = () => {
    googleLogout();
    localStorage.clear();
    dispatch(logout());
    setUser(null);
    navigate('/', { replace: true });
  }

  const classes = navStyles();
  return (
    <AppBar className={user ? classes.loggedIn : classes.loggedOut} position="static" color="inherit">
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
          height={50} 
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
                alt={user?.name} src={user?.picture}
              >
                {user?.name?.charAt[0]}
              </Avatar>
              <Typography
                variant='h6'
              >
                {user?.name}
              </Typography>
              <Button 
                variant="contained"
                color='secondary'
                onClick={logOutUser}
              >Logout</Button>
            </div>
          ) : (<div className={classes.noProfile}>
                <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
                >
                  Sign In
                </Button>
              </div>)}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;