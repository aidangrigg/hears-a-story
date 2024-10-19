import { Router } from "express";
import { postTTS } from "./tts.handler";

const router = Router();

router.post('/', postTTS);

export default router;
