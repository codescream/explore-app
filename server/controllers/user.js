import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { configDotenv } from "dotenv";

import UserModel from "../models/user.js";

configDotenv();

export const addUser = async (req, res) => {
  const {firstName, lastName, email, password, confirmpassword, picture} = req.body;

  const userExist = await UserModel.findOne({ email });

  if(userExist)
    return res.status(400).json({ message: 'user already exists!' });
  
  if(password !== confirmpassword)
    return res.status(404).json({ message: 'passwords do not match!' });

  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

  const user = new UserModel({
    name: `${firstName} ${lastName}`,
    email,
    password: hash,
    picture
  });

  user.save()
    .then((data) => {
      const token = jwt.sign({ email: data.email, id: data._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({data, token});
    })
    .catch((err) => res.status(500).json(err));
}

export const getUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const userExist = await UserModel.findOne({ email });

    if(!userExist) return res.status(404).json({ message: 'username or password not correct' });

    if(!bcrypt.compareSync(password, userExist.password))
      return res.status(404).json({ message: 'username or password not correct' });

    const token = jwt.sign({ email: userExist.email, id: userExist._id }, process.env.JWT_SECRET, { expiresIn: 60 * 3 });

    const user = await UserModel.findOne({ email }, {password: 0});

    res.status(200).json({ data: user, token});
  }catch(error) {
    console.log(error);
    res.status(500).json({ message: 'There was an error, please contact your Administrator' });
  } 
}