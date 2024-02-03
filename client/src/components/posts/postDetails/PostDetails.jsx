import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { motion, AnimatePresence } from "framer-motion";

import postDetailsStyles from './styles';
import Comments from './comments/Comments';


const PostDetails = ({ selectedPost, setSelectedPost, setShowDetails, posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedExplores, setRelatedExplores] = useState([]);
  
  const classes = postDetailsStyles();

  const explore = selectedPost?.selectedFile[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);

    setRelatedExplores(posts?.filter((post) => {
      return post.tags.some(tag => selectedPost?.tags.includes(tag)) && post._id !== selectedPost?._id
    }));

    //eslint-disable-next-line
  }, [selectedPost]);


  const switchExplore = (explore) => {
    setSelectedPost(null); 
    setShowDetails(false);

    setTimeout(() => {
      setSelectedPost(explore);
      setShowDetails(true);
    }, 1000);
  }

  const switchImg = (curIndex) => {
    setCurrentIndex(curIndex);
  }

  return (
    <AnimatePresence>
      {
        selectedPost?._id && (
          <motion.div layoutId={selectedPost?._id}
            className={classes.postDetailsContainer}
            onClick={() => {setSelectedPost(null); setShowDetails(false)}}
          >
            <div className={classes.postDetails}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={classes.postDetailsImages} style={{ overflow: 'hidden' }}>
                <motion.img src={explore} alt="post"
                  key={currentIndex}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0}}
                  transition={{ duration: 0.2 }}
                />
                {
                  (selectedPost?.selectedFile.length > 1) && (
                    <>
                      <motion.div className={classes.prev}
                        onClick={() => switchImg(currentIndex === 0 ? selectedPost?.selectedFile.length - 1 : currentIndex - 1)}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {"‣"}
                      </motion.div>
                      <motion.div className={classes.next}
                        onClick={() => switchImg(currentIndex === selectedPost?.selectedFile.length - 1 ? 0 : currentIndex + 1)}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {"‣"}
                      </motion.div>
                    </>
                  )
                }
              </div>
              <div className={classes.closePostDetailsBtn}
              onClick={() => {setSelectedPost(null); setShowDetails(false)}}
              >
                <Typography style={{ fontWeight: 'bold' }}>X</Typography>
              </div>
              <div className={classes.details} style={{ width: '70%', backgroundColor: 'black', marginTop: '20px' }}>
                {
                  selectedPost?.tags.map((tag, index) => 
                  <Button
                  color='primary'
                  style={{ fontSize: '7px', padding: '2px 1px' }}
                  key={`${tag}-${index}`}
                  >
                    {`#${tag}`}
                  </Button>
                )}
              </div>
              <div className={classes.title} style={{ marginTop: '20px'}}>
                <Typography
                  variant='h6'
                >
                  {selectedPost.title}
                </Typography>
              </div>
              <Typography
                variant='body2'
                gutterBottom
                color="textSecondary"
                component="p"
                style={{ width: '70%', whiteSpace: 'pre-wrap', marginBottom: '50px' }}
              >
                {selectedPost.message}
              </Typography>

              <Comments key={selectedPost} post={selectedPost} />

              <motion.div
                whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                transition={{ duration: 0.5 }}
                style={{ marginTop: '50px', width: '90%'}}
              >
                <Typography>Related Explores...</Typography>
                <Divider style={{ height: '3px', color: 'black'}} />
                <Grid 
                  container
                  direction='row'
                  wrap='wrap'
                  spacing={2}
                  className={classes.relatedContainer}
                >
                  {
                    relatedExplores?.map((explore, index) => <Grid item key={index} className={classes.relatedExplore}>
                      <motion.div
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale:     1.1 }}
                        transition={{ duration: 0.5, type: 'tween'}}
                        key={index}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                        onClick={() => switchExplore(explore)}
                      >
                        <Typography style={{ textAlign: 'center' }}>{explore.title}</Typography>
                        <img width={'100%'} height={'100%'} src={explore.selectedFile[0]} alt="explore" style={{ objectFit: 'cover', borderRadius: '10px', minHeight: "150px" }} />
                      </motion.div>
                    </Grid>)
                  }
                </Grid>
              </motion.div>
            </div>
          </motion.div>
        )}
    </AnimatePresence>
  )}

export default PostDetails;