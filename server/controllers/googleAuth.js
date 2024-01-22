import queryString from 'query-string';
import jwt from "jsonwebtoken";
import axios from 'axios';
import { configDotenv } from "dotenv";

export const authenticateUser = async (req, res) => {
  const { code } = req.body;

  configDotenv();
 
  const tokenParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code,
    grant_type: process.env.GOOGLE_GRANT_TYPE,
    redirect_uri: process.env.REDIRECT_URI,
  });
  
  try{
    const { data: { id_token } } = await axios.post(`https://oauth2.googleapis.com/token?${tokenParams}`);

    if(!id_token)
      return res.status(400).json({ message: 'Auth error'});

    // const test = await axios.post(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${tokenParams.code}`);

    // console.log(test)
    
    const { sub, email, name, picture } = jwt.decode(id_token);
    const user = { _id: sub, email, name, picture, id_token };

    res.json(user);
  
    
  }catch(err) {
    console.log(err);
  }
  
}

  