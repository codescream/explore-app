import React, { useState, useRef } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import formStyles from './styles';
import { create_post } from '../../redux/reducers/posts';

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: [""]
  });

  const formRef = useRef(null);

  const dispatch = useDispatch();
  const classes = formStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(create_post(postData));
  }

  const clear = (e) => {
    formRef.current.reset();
  }

  const setSelectedFiles = (data) => {
    const base64 = data.map(({ base64 }) => base64);
    
    setPostData({ ...postData, selectedFile: base64 });
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Typography variant='h6'>Create an Explore</Typography>
        <TextField 
          name="creator" 
          variant='outlined' 
          label='Creator' 
          fullWidth 
          value={postData.creator}
          onChange={e => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField 
          name="title" 
          variant='outlined' 
          label='Title' 
          fullWidth 
          value={postData.title}
          onChange={e => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField 
          name="message" 
          variant='outlined' 
          label='Message'
          multiline
          minRows={4}
          fullWidth 
          value={postData.message}
          onChange={e => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField 
          name="tags" 
          variant='outlined' 
          label='Tags'
          fullWidth 
          value={postData.tags}
          onChange={e => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase 
            name="selectedFile"
            value={postData.selectedFile}
            type="file"
            multiple={true}
            onDone={(data) => setSelectedFiles(data)}
          />
        </div>
        <Button 
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size='large'
          type='submit'
          fullWidth
        >Submit</Button>
        <Button 
          variant="contained"
          color="secondary"
          size='small'
          onClick={clear}
          fullWidth
        >Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;