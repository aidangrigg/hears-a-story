import { Router } from "express";
import { getExample } from "./example.handler";

const router = Router();

router.get('/', getExample);

export default router;
