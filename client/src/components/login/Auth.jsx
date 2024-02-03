import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

import authStyles from './styles';
import Input from './Input';
import { sign_in_google, create_user, sign_in } from '../../redux/reducers/user';

const initFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
  picture: ""
}

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initFormState);
  const classes = authStyles();

  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignup){
      dispatch(create_user(formData))
        .then((data) => console.log('user created'));
    }else {
      dispatch(sign_in({ email: formData.email, password: formData.password }))
        .then((data) => {console.log(data.type); navigate('/', { replace: true })});
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      dispatch(sign_in_google({code: response.code}));
    },
    onError: response => {
      console.log(response);
    },
    flow: 'auth-code',
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
                <>
                  <Input name='confirmpassword' label='Confirm Password' handleChange={handleChange} type={showConfirmPassword ? "text" : "password"} handleShowPassword={() => handleShowPassword('confirm')} />

                  <div className={classes.picture}>
                    <FileBase64 
                      type="file"
                      name="picture"
                      multiple={false}
                      value={formData.picture}
                      onDone={({base64}) => setFormData({ ...formData, picture: base64 })}
                    />
                  </div>
                  
                </>
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