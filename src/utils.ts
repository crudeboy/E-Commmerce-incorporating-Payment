import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

export const generateToken = (user: { [key: string]: string | boolean }) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    },
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if(authorization) {
    const token = authorization.slice(7,authorization.length)
    jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err,decode)=> {
      if(err){
        res.status(401).send({message: 'Invalid Token'})
      }else {
        req.user = decode;
        next();
      }
    })
  } else {
    res.status(401).send({ message: 'No Token' });
  }
}

export const isAdmin = (req:Request, res:Response, next:NextFunction) => {
  if(req.user && req.user.isAdmin)  {
    next()
  } else {
    res.status (401).send({message: 'Invalid Admin Token'})
  }
}