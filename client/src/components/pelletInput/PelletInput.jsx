import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';

import pelletStyles from './styles';

const PelletInput = ({ tags, clearTag, setTags, createTags }) => {
  const classes = pelletStyles();
  return (
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
            onClick={clearTag}
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
          value={tags}
          onChange={e => setTags([ ...tags, e.target.value === ' ' ? '' : e.target.value ])}
          onKeyDown={createTags}
          style={{margin: '0px', padding: '0px', paddingLeft: '5px'}}
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default PelletInput;