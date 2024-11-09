import { getLinks } from "../Controllers/Links.js";
import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();


router.get('/', getLinks);

router.get('/bot-status', async (req, res) => {
  try {
    const response = await fetch(process.env.BOT_API_URL);  
    const data = await response.json();  
    
    // Controlla se 'botStatus' è presente e lo restituisce
    res.json(data);  
    
  } catch (error) {
    console.error("Errore nel recuperare lo stato del bot:", error);
    
    // Restituisce botStatus: false se si verifica un errore (ad esempio, il bot è spento)
    res.json({ botStatus: false });
  }
});

export default router;
