import { Router } from "express";
import exampleRoute from "./api/example";
import docsRoute from "./api/docs";
import storyRoute from "./api/story";

const app = Router();

app.use('/api/example', exampleRoute);
app.use('/api/docs', docsRoute);
app.use('/api/story', storyRoute);

export default app;
