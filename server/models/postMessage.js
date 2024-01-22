import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator_id: String,
  name: String,
  tags: [String],
  selectedFile: [String],
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;