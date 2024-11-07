import { getLinks } from "../Controllers/Links.js";
import express from 'express';
const router = express.Router();

router.get('/', getLinks)

export default router;
