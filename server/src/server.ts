import express, { Express } from "express";
import dotenv from "dotenv";

import routes from './routes';
import auth from './middleware/auth';

dotenv.config();

const app: Express = express();

// Middleware
app.use(auth);

// Routing
app.use(routes);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
