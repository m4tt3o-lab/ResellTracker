import { Client, GatewayIntentBits } from 'discord.js';
import Link from './Models/Links.js';
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const app = express();  
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});




client.once('ready', () => {
  console.log(`Bot connesso come ${client.user.tag}`);
});

app.get('/bot-status', (req, res) => {
  try {
    // Verifica se il bot è pronto
    const botStatus = client.isReady(); 
    // Restituisce direttamente lo stato del bot come oggetto
    res.json({ botStatus });  
  } catch (error) {
    console.error("Errore nel recuperare lo stato del bot:", error);
    res.json({ botStatus: false });
  }
});

client.on('messageCreate', async (message) => {
  if (message.embeds.length > 0) {
    console.log("Embed trovato!");
    for (const embed of message.embeds) {
      const title = embed.title || null;
      const description = embed.description || null;
      const fields = embed.fields || [];
      console.log(`Titolo: ${title}`);
      console.log(`Descrizione: ${description}`);

      for (const field of fields) {
        console.log(`${field.name}: ${field.value}`);

        if (field.name) {
          // regex per estrarre il link
          const match = field.value.match(/\[Click here\]\((https:\/\/discord\.com\/channels\/\d+\/\d+\/\d+)\)/);
          console.log("Risultato Regex:", match);
          if (match) {
            const link = match[1];  // Crea l'oggetto URL 
            console.log(`Il link da inviare è: ${link}`);
            try {
              const newLink = await Link.create({ Url: link });
              console.log("Link salvato nel database:", newLink.Url);
            } catch (dbError) {
              console.error("Errore nel salvare il link nel database:", dbError.message);
            }
          } else {
            console.log("Nessun link valido trovato.");
          }
        }
      }
    }
  } else {
    console.log("Il messaggio non contiene embed.");
  }
});
client.login(process.env.TOKEN);

app.listen(process.env.BOT_PORT, () => {
  console.log(`Bot API server is running on port ${process.env.BOT_PORT}`);
});

export default client
