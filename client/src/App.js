import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'; 

import appStyles from './styles';
import Posts from './components/posts/Posts';
import Form from './components/form/Form';
import explore from './assets/explore.png';
import { useDispatch } from 'react-redux';
import { fetch_all } from './redux/reducers/posts';

const App = () => {
  const classes = appStyles();  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_all());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography
          variant="h2"
          align="center"
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
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;