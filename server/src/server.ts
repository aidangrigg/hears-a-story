import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from './routes';
import auth from './middleware/auth';

dotenv.config();

const app: Express = express();

// Middleware
app.use(auth);
app.use(express.json());

// Routing
app.use(routes);
app.use(cors({
  origin: '*', // Allow all origins
  optionSuccessStatus: 200,
}));

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
