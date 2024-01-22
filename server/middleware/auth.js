import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decoded;
    console.log(token);

    if(!token)
      return res.status(401).json({ message: 'Unathenticated' });

    if(token.length < 500) {
      // custom token
      decoded = jwt.verify(token, 'secret');

      req.userId = decoded?.id;
    }else {
      // google oauth token
      console.log('google oauth');
      decoded = jwt.decode(token);

      req.userId = decoded?.sub;
    }

    next();
  }catch(error) {
    res.status(404).json({message: error.message});
    console.log(error);
  }
  
}

export default auth;