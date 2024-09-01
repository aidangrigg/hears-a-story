import { Router } from "express";
import exampleRoute from "./api/example";

const app = Router();

app.use('/api/example', exampleRoute);

export default app;
