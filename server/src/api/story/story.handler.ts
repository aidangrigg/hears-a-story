import { Request, Response } from "express";

export function getStories(req: Request, res: Response) {
    res.send("Get stories");
}

export function createStory(req: Request, res: Response) {
    res.send("create story");
}
