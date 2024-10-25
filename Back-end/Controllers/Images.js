import path from "path";
import fs from "fs";

export const searchImages = (req, res) => {
  const query = req.query.query.toLowerCase();
  const imagesDir = path.join(path.resolve(), 'images');

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nel leggere la cartella delle immagini.' });
    }
    // Filter
    const matchedFiles = files.filter(file => file.toLowerCase().includes(query));
    const modifiedFiles = matchedFiles.map(file => file.slice(0, -4));
    res.json(modifiedFiles);
  });
};


export const getAllImages = (req, res) => {
    const imagesDir = path.join(path.resolve(), 'images');

    fs.readdir(imagesDir, (err, files) => {
    if (err) {
        return res.status(500).json({ error: 'Errore nel leggere la cartella delle immagini' });
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|)$/.test(file));

    const imageUrls = imageFiles.map(file => `http://localhost:3000/images/${file}`);
    res.json(imageUrls);
    });
  };