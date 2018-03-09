import jwt from 'jsonwebtoken';
require('dotenv').config();

const secret = process.env.SECRET;

export default class Authentication {

  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];

    if(!token) {
      return res.status(401).send({message: 'You are not authorized to access this route'});
    }

    jwt.verify(token, secret , (err, decoded) => {

      if (err) {
        return res.status(401).send({message: 'Authorization failed due to invalid token'});
      }
      
      req.decoded = decoded;
      next();
    });
  }
}
