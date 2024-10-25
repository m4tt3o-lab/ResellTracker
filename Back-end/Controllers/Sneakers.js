import Sneaker from "../Models/Sneakers.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getSneakers = async (req, res) => {
  try {
    const sneakers = await Sneaker.findAll();
    res.status(200).json(sneakers);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delle sneakers' });
  }
};

//------------------------------------------------------------------

export const getSneakerById = async (req, res) => {
  const { id } = req.params;
  try {
    const sneaker = await Sneaker.findByPk(id); // Cerco l'id
    if (!sneaker) {
      return res.status(404).json({ error: 'sneaker non trovato' });
    }
    res.status(200).json(sneaker);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delka sneaker' });
  }
};

//------------------------------------------------------------------

const findImage = (modelName) => {
  const imagesDirectory = path.join(__dirname, '../images'); 
  const files = fs.readdirSync(imagesDirectory); 

  const foundImage = files.find(file => file.toLowerCase().includes(modelName.toLowerCase()));

  return foundImage ? `images/${foundImage}` : ''; 
};

export const postSneaker = async (req, res) => {
  const { modello, dataAcquisto, prezzoAcquisto, dataVendita, prezzoVendita } = req.body;
  
  if (prezzoVendita && !dataVendita) {
    return res.status(400).json({ error: 'Non puoi inserire un prezzo di vendita senza una data di vendita.' });
  }
  const imageUrl = findImage(modello);

  
  try {
    const newSneaker = await Sneaker.create({ 
      imageUrl, 
      modello,
      dataAcquisto,
      prezzoAcquisto,
      dataVendita: dataVendita || null ,
      prezzoVendita: prezzoVendita || null
    });

    res.status(201).json(newSneaker);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella creazione della sneaker' });
  }
};

//------------------------------------------------------------------

export const updateSneaker = async (req, res) => {
  const { id } = req.params;
  const { modello, dataAcquisto, prezzoAcquisto, dataVendita, prezzoVendita } = req.body;
  
  try {
    const sneaker = await Sneaker.findByPk(id);
    if (!sneaker) {
      return res.status(404).json({ error: 'sneaker non trovata' });
    }
 
    sneaker.modello = modello;
    sneaker.dataAcquisto = dataAcquisto;
    sneaker.prezzoAcquisto = prezzoAcquisto;
    sneaker.dataVendita = dataVendita ;
    sneaker.prezzoVendita = prezzoVendita;
    
    await sneaker.save(); 

    res.status(200).json(sneaker);
    
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento della sneaker' });
  }
};

//------------------------------------------------------------------

export const deleteSneaker = async (req, res) => {
  const { id } = req.params;
  
  try {
    const sneaker = await Sneaker.findByPk(id); 
    if (!sneaker) {
      return res.status(404).json({ error: 'sneaker non trovata' });
    }
    await sneaker.destroy(); 
    res.status(204).send(); 

  } catch (error) {
    res.status(500).json({ error: 'Errore nella cancellazione della sneaker' });
  }
};


