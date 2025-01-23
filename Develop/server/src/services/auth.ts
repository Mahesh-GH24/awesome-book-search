//Commented
//import type { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//Added
import { GraphQLError } from 'graphql';

dotenv.config();

//Commented
// interface JwtPayload {
//   _id: unknown;
//   username: string;
//   email: string,
// }

//authenticate Token
export const authenticateToken = ({ req }: any) => {
  //Allows token to be sent via req.body / req.query / headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  //if the token is sent via Authorization Header, extract the token from the header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // if no token has been provided, return the request object as is
  if (!token) {
    return req;
  }

  //Verify the token is valid - max 2 hours
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    //if the token is valid, attach the user data to the request object
    req.user = data;
  } catch (err) {
    //if the token is invalid, log an error message
    console.log('Invalid Token');
  }

  //Return the request object
  return req;
};

//signToken
export const signToken = (username: string, email: string, _id: unknown) => {
  //create a payload with the user info
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;   

  //sign the token with the payload and secret key and set it to expire in 2 hours
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined,undefined, ['UNAUTHENtiCATED']);
    Object.defineProperty(this, 'name', {value: 'AuthenticationError'});
  }
};


//Commented existing JWT Code
/*
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;  
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
*/
