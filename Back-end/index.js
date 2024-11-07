import express from "express";
import cors from 'cors';
import sequelize from './db.js';
import sneakersRoutes from './Routes/Sneakers.js'
import linksRoutes from './Routes/Links.js'
import path from "path";
import imagesRoutes from './Routes/Images.js'


sequelize.sync({ alter: true })  
  .then(() => {
    console.log('Database e tabelle sincronizzati');
  })
  .catch(err => {
    console.error('Errore nella sincronizzazione del database:', err);
  });

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json()); 

app.use('/images', express.static(path.join(path.resolve(), 'images')));

app.use('/sneakers', sneakersRoutes);
app.use('/links', linksRoutes);

app.use('/images', imagesRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

