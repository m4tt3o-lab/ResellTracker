import express from "express";
import { searchImages, getAllImages } from "../Controllers/Images.js";

const router = express.Router();
router.get('/search', searchImages);
router.get('/', getAllImages);

export default router;