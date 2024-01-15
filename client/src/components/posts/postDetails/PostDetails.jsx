import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Typography } from '@material-ui/core';
import { motion, AnimatePresence } from "framer-motion";

import postDetailsStyles from './styles';


const PostDetails = ({ selectedPost, setSelectedPost, setShowDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const classes = postDetailsStyles();

  const explore = selectedPost?.selectedFile[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
  
  }, [selectedPost]);
  

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
                <div className={classes.prev}
                  onClick={() => switchImg(currentIndex === 0 ? selectedPost?.selectedFile.length - 1 : currentIndex - 1)}
                >
                  {"‣"}
                </div>
                <div className={classes.next}
                  onClick={() => switchImg(currentIndex === selectedPost?.selectedFile.length - 1 ? 0 : currentIndex + 1)}
                >
                  {"‣"}
                </div>
              </div>
              <div className={classes.closePostDetailsBtn}
              onClick={() => {setSelectedPost(null); setShowDetails(false)}}
              >
                <Typography style={{ fontWeight: 'bold'}}>X</Typography>
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
                style={{ width: '70%', whiteSpace: 'pre-wrap' }}
              >
                {selectedPost.message}
              </Typography>
            </div>
            
          </motion.div> 
        )}
    </AnimatePresence>
  )}

export default PostDetails;