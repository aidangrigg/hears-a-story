import { Request, Response } from "express";

export function getExample(req: Request, res: Response) {
  res.send("This is an example!");
};
