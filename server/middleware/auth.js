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

      req.id = decoded?.id;
    }else {
      // google oauth token
      decoded = jwt.decode(token);

      req.id = decoded?.sub;
    }

    next();
  }catch(error) {
    console.log(error);
  }
  
}

export default auth;