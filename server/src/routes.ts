import { Router } from "express";
import exampleRoute from "./api/example";
import ttsRoute from "./api/tts";

const app = Router();

app.use('/api/example', exampleRoute);
app.use('/api/tts', ttsRoute);

export default app;
