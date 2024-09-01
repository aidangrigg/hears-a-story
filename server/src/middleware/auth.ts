import { Request, Response, NextFunction } from 'express';

// TODO: actually set up auth middleware
function authenticate(req: Request, res: Response, next: NextFunction) {
  console.log("Request type: ", req.method);
  next();
};

export default authenticate;
