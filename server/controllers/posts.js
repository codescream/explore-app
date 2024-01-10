import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = (req, res) => {
  // try {
  //   const postMessages = await PostMessage.find();

  //   res.status(200).json(postMessages);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }

  PostMessage.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ message: err.message}));
}

export const createPost = (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  newPost.save()
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({error: err.message})); 
}

export const updatePost = (req, res) => {
  const post = req.body;
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  PostMessage.updateOne(id, { $set: post }, {new: true})
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({error: err.message}));
}