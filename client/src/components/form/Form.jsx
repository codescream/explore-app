import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import formStyles from './styles';
import { create_post, update_post } from '../../redux/reducers/posts';
import { post_id } from '../../redux/reducers/allState';


const Form = () => {
  const [formTitle, setFormTitle] = useState("Create an Explore");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: [""]
  });
  const [file, setFile] = useState(Date.now())

  const postId = useSelector((state) => state.allStateReducer.value);

  const post_to_update = useSelector((state) =>  postId ? state.postsReducer.data.find((post) => post._id === postId) : postData);

  useEffect(() => {
    if(postId) {
      setPostData(post_to_update);
      setFormTitle("Edit your Explore");
      setSubmitBtn("Update");
    }
    
  }, [postId, post_to_update]);

  const dispatch = useDispatch();
  const classes = formStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(submitBtn === "Update" && postId) {
      dispatch(update_post({postId, postData}));

      clear();
    }else {
      console.log(postData);
      dispatch(create_post(postData));
    }
  }

  const clear = () => {
    dispatch(post_id(null));
    setFormTitle("Create an Explore");
    setSubmitBtn("Submit");
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: [""]
    });
    setFile(Date.now());
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
      >
        <Typography variant='h6'>{formTitle}</Typography>
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
            key={file}
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
        >{submitBtn}</Button>
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