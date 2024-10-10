import Sneaker from "../Models/Sneakers.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Soluzione per ottenere __dirname in un modulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Funzione per recuperare tutte le sneakers
export const getSneakers = async (req, res) => {
  try {
    const sneakers = await Sneaker.findAll();
    res.status(200).json(sneakers);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delle sneakers' });
  }
};

// Funzione per trovare l'immagine nella cartella 'images'
const findImage = (modelName) => {
  const imagesDirectory = path.join(__dirname, '../images'); // Modifica il percorso se necessario
  const files = fs.readdirSync(imagesDirectory); // Leggi i file nella cartella

  // Trova il file il cui nome contiene il nome del modello
  const foundImage = files.find(file => file.toLowerCase().includes(modelName.toLowerCase()));

  return foundImage ? `images/${foundImage}` : ''; // Restituisce il percorso dell'immagine o una stringa vuota se non trovata
};

// Funzione per aggiungere una nuova sneaker
export const postSneaker = async (req, res) => {
  const { modello, dataAcquisto, prezzoAcquisto, dataVendita, prezzoVendita } = req.body;
  
  // Cerca l'immagine del modello
  const imageUrl = findImage(modello);

  try {
    const newSneaker = await Sneaker.create({ 
      imageUrl, 
      modello,
      dataAcquisto,
      prezzoAcquisto,
      dataVendita: dataVendita || '' ,
      prezzoVendita: prezzoVendita || '' 
    });

    res.status(201).json(newSneaker);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella creazione della sneaker' });
  }
};
