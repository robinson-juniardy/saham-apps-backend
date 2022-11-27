import { NextFunction, Request, Response } from "express";

export default class AppMiddleware {
  auth(request: Request, response: Response, next: NextFunction) {
    console.log("is Auth");
    next();
  }
  logger(request: Request, response: Response, next: NextFunction) {
    console.log(request.hostname);
    next();
  }
}
