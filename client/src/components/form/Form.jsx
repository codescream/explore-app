import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';


import formStyles from './styles';
import { create_post, update_post } from '../../redux/reducers/posts';
import { post_id } from '../../redux/reducers/allState';


const Form = () => {
  const [formTitle, setFormTitle] = useState("Create an Explore");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: [""],
    selectedFile: [""]
  });
  const [file, setFile] = useState(Date.now());

  const tagsRef = useRef(null);

  const postId = useSelector((state) => state.allStateReducer.value);

  const post_to_update = useSelector((state) =>  postId ? state.postsReducer.data.find((post) => post._id === postId) : postData);

  useEffect(() => {
    if(postId) {
      setTags(post_to_update.tags);
      setPostData({ ...post_to_update,  tags: '' });
      setFormTitle("Edit your Explore");
      setSubmitBtn("Update");
    }
  }, [postId, post_to_update]);

  const dispatch = useDispatch();
  const classes = formStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if(submitBtn === "Update" && postId) {
      dispatch(update_post({postId, postData: {...postData, tags: tags}}));
    }else {
      console.log(postData);
      dispatch(create_post({...postData, tags: tags}));
    }
    clear();
  }

  const clear = () => {
    dispatch(post_id(null));
    setFormTitle("Create an Explore");
    setSubmitBtn("Submit");
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [""],
      selectedFile: [""]
    });
    setTags([]);
    setFile(Date.now());
  }

  const setSelectedFiles = (data) => {
    const base64 = data.map(({ base64 }) => base64);
    
    setPostData({ ...postData, selectedFile: base64 });
  }

  const createTags = (e) => {
    console.log(e);
    console.log(postData.tags);
    console.log(tagsRef.current.value);
    switch(e.key) {
      case ' ':
        if(!tags.includes(e.target.value) && e.target.value !== "")
          setTags([...tags, `${e.target.value}`]);
        postData.tags = '';
        tagsRef.current.value = "";
        break;
      case 'Backspace':
        if(postData.tags === '')
          setTags([...tags.slice(0, -1)]);
        break;
      default:
        break;
    }
  }

  const clearTag = (tag2remove) => {
    setTags(tags.filter(tag => tag !== tag2remove));
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
              tags.map((tag, index) => <Grid item key={index}
                style={{backgroundColor: 'blue', margin: '2px', borderRadius: '3px', height: 'fit-content'}}
              ><Typography>{tag} <span style={{cursor: 'pointer', color: 'red'}}
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
              value={postData.tags}
              onChange={e => setPostData({ ...postData, tags: e.target.value === ' ' ? '' : e.target.value })}
              onKeyDown={e => createTags(e)}
              style={{margin: '0px', padding: '0px', paddingLeft: '5px'}}
              InputProps={{
                disableUnderline: true,
              }}
              inputRef={tagsRef}
            />
          </Grid>
        </Grid>
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