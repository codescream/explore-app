import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  picture: String,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;