import { deleteAllLinks, getLinks } from "../Controllers/Links.js";
import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();


router.get('/', getLinks);

router.get('/bot-status', async (req, res) => {
  try {
    const response = await fetch(process.env.BOT_API_URL);  
    const data = await response.json();  
    res.json(data);  
  } catch (error) {
    console.error("Errore nel recuperare lo stato del bot:", error);
    res.json({ botStatus: false });
  }
});


router.delete('/delete-all-links', deleteAllLinks)

export default router;
