import express from "express";
import cors from 'cors';
import sequelize from './db.js';

// Sincronizza il database con i modelli
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database e tabelle sincronizzati');
  })
  .catch(err => {
    console.error('Errore nella sincronizzazione del database:', err);
  });

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  