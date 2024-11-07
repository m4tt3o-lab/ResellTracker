import { Client, GatewayIntentBits } from 'discord.js';
import Link from './Models/Links.js';
import dotenv from 'dotenv';

dotenv.config();

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

client.on('messageCreate', async (message) => {
  if (message.embeds.length > 0) {
    console.log("Embed trovato!");
    for (const embed of message.embeds) {
      const title = embed.title || 'Nessun titolo';
      const description = embed.description || 'Nessuna descrizione';
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
