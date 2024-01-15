import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import authStyles from './styles';
import Input from './Input';
import { sign_in } from '../../redux/reducers/user';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const classes = authStyles();

  const dispatch = useDispatch();  

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const handleShowPassword = (option) => {
    switch(option) {
      case 'confirm':
        setShowConfirmPassword((prevshowPassword) => !prevshowPassword);
        break;
      default:
        setShowPassword((prevshowPassword) => !prevshowPassword);
        break;
    }
  }

  const switchMode = () => {
    setIsSignup((previsSignup) => !previsSignup);
  }

  const login = useGoogleLogin({
    onSuccess: response => {
      console.log(response);
      dispatch(sign_in(response));
    },
    onError: response => {
      console.log(response);
    },
    flow: 'implicit',
    ux_mode: 'popup',
    onNonOAuthError: onNonOAuthError => console.log(onNonOAuthError),
    state_cookie_domain: "http://localhost"
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half type="text" handleShowPassword={handleShowPassword} />

                  <Input name='lastName' label='Last Name' handleChange={handleChange} half type="text" />
                </>
            )}
                  <Input name='email' label='Email' handleChange={handleChange}  type="email" />

                  <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={() => handleShowPassword('')} />
            {
              isSignup && (
                <Input name='confirmpassword' label='Confirm Password' handleChange={handleChange} type={showConfirmPassword ? "text" : "password"} handleShowPassword={() => handleShowPassword('confirm')} />
              )
            }
          </Grid>
          <Button
              variant='contained'
              fullWidth
              color='primary'
              className={classes.submit}
              type='submit'
          >{isSignup ? 'Sign Up' : 'Sign In'}</Button>
          <Button 
            fullWidth
            color='primary'
            variant='contained'
            className={classes.googleButton}
            onClick={() => login()}
          >
            <FcGoogle style={{ fontSize: '20px', marginRight: '5px'}} /> Sign in with Google
          </Button>
          {/* <GoogleLogin 
            clientId='221110187907-0lsck5rqjosb6rbflf6ndk69h35vkp1u.apps.googleusercontent.com'
            render={renderProps => (
              <Button 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}
                fullWidth
                color='primary'
                variant='contained'
                className={classes.googleButton}
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={login}
            onFailure={login}
            cookiePolicy={'single_host_origin'}
          /> */}
          <Grid
            container
            justifyContent='flex-end'
          >
            <Grid item>
              <Button
                onClick={switchMode}
              >{isSignup ? 'Already Have an Account? Sign In' : 'Don\'t have an account? Sign Up'}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;