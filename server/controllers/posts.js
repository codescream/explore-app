import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  // try {
  //   const postMessages = await PostMessage.find();

  //   res.status(200).json(postMessages);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  const { page } = req.query;

  console.log(page);
  
  const LIMIT = 8;
  const skip = (page - 1) * LIMIT;
  const totalDocuments = await PostMessage.countDocuments();

  const totalPages = Math.round(totalDocuments / LIMIT);

  PostMessage.find()
    .skip(skip)
    .limit(LIMIT)
    .then((data) => {console.log(data); res.status(200).json({ posts: data, page, totalPages })})
    .catch((err) => res.status(500).json({ message: err.message}));
}

export const searchPosts = (req, res) => {
  const { search, tags } = req.query;

  const title = new RegExp(search, 'i');

  const tagsArray = tags.split(',');
  console.log(title);

  const query = {
    $or: [
      { title },
      { tags: { $in: tagsArray} }
    ]
  };

  PostMessage.find(query)
    .then((data) => {console.log(data); res.status(200).json(data)})
    .catch(err => res.status(404).json({ message: err.message }));
}

export const createPost = (req, res) => {
  const post = req.body;

  if(!req.userId)
    return res.status(401).json({ message: 'Unathenticated' });

  const newPost = new PostMessage({...post, creator_id: req.userId});

  console.log(newPost.createdAt);

  newPost.save()
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({error: err.message})); 
}

export const likePost = (req, res) => {
  const post = req.body;
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  if(!req.userId)
    return res.status(401).json({ message: 'Unathenticated' });

  PostMessage.findByIdAndUpdate({_id: id}, { likes: post.likes }, {new: true})
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({error: err.message}));
}

export const updatePost = (req, res) => {
  const post = req.body;
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  if(!req.userId)
    return res.status(401).json({ message: 'Unathenticated' });

  PostMessage.findByIdAndUpdate({_id: id}, post, {new: true})
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({error: err.message}));
}

export const deletePost = (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  if(!req.userId)
    return res.status(401).json({ message: 'Unathenticated' });

  PostMessage.findByIdAndDelete(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status());
}