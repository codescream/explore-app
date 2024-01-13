import React, { useEffect } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { fetch_all } from '../../redux/reducers/posts';
import Posts from '../posts/Posts';
import Form from '../form/Form';
import homeStyles from './styles';


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_all());
  }, [dispatch]);

  const classes = homeStyles(); 
  return (
    <>
      <Grow in>
        <Container>
          <Grid container className={classes.mobile} justifyContent='space-between' alignItems="stretch" spacing={3}>
            <Grid item xs={12} md={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} md={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  )
}

export default Home;