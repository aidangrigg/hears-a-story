import { Router } from "express";
import { getStories, createStory } from "./story.handler";

const router = Router();

router.get('/', getStories);
router.post('/', createStory);

// TODO: websocket stuff

export default router;
