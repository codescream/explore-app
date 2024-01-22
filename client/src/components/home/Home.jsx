import React, { useEffect, useState } from 'react';
import { AppBar, Container, Grid, Grow, Paper, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';


import { fetch_all } from '../../redux/reducers/posts';
import Posts from '../posts/Posts';
import Form from '../form/Form';
import homeStyles from './styles';
import Paginate from '../paginate/Paginate';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(fetch_all());
  }, [dispatch]);

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {

    }
  }

  const createTags = (e) => {
    switch(e.key) {
      case ' ':
        if(!tags.includes(e.target.value) && e.target.value !== "")
          setTags([...tags, `${e.target.value}`]);
        setTagInput('');
        // tagsRef.current.value = "";
        break;
      case 'Backspace':
        (tagInput === '') && setTags([...tags.slice(0, -1)]);
        break;
      default:
        break;
    }
  }

  const clearTag = (tag2remove) => {
    setTags(tags.filter(tag => tag !== tag2remove));
  }

  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const classes = homeStyles(); 
  return (
    <>
      <Grow in>
        <Container maxWidth='xl'>
          <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField 
                  name='search'
                  variant='outlined'
                  label='Search Explores'
                  fullWidth
                  value={search}
                  onKeyDown={handleKeyPress}
                  onChange={e => setSearch(e.target.value)}
                />
                <Grid 
                  container
                  direction='row'
                  spacing={1}
                  justifyContent='flex-start'
                  style={{borderRadius: '5px', padding: '0px', margin: '5px 8px', width: '100%'}}
                  className={classes.tags}
                  tabIndex="0"
                >
                    {
                      tags?.map((tag, index) => <Grid item key={index}
                        style={{backgroundColor: '#4356d3', margin: '2px', paddingLeft: '10px', borderRadius: '14px', height: 'fit-content', hover: 'red'}}
                      ><Typography style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: '13px'}}>{tag} <span style={{cursor: 'pointer', color: 'black', padding: '0px 8px 1px', marginLeft: '5px', fontSize: '15px', backgroundColor: '#f50057', borderRadius: '60%', textAlign: 'center', fontWeight: 'bold'}}
                        onClick={() => clearTag(tag)}
                      >x</span></Typography></Grid>)
                    }
                  
                  <Grid item xs={12}>
                    <TextField 
                      name="tags" 
                      size='small'
                      // variant='outlined' 
                      // label='Tags'
                      fullWidth 
                      placeholder='Enter a tag, and spacebar to set'
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value === ' ' ? '' : e.target.value)}
                      onKeyDown={e => createTags(e)}
                      style={{margin: '0px', padding: '0px', paddingLeft: '5px'}}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      // inputRef={tagsRef}
                    />
                  </Grid>
                </Grid>
              </AppBar>
              <Form />
              <Paper elevation={6}>
                <Paginate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  )
}

export default Home;