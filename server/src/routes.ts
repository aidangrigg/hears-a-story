import { Router } from "express";
import exampleRoute from "./api/example";
import docsRoute from "./api/docs";


const app = Router();

app.use('/api/example', exampleRoute);
app.use('/api/docs', docsRoute);

export default app;
