import Link from "../Models/Links.js";

export const getLinks = async (req, res) => {
    try {
      const links = await Link.findAll();
      res.status(200).json(links);
    } catch (error) {
      res.status(500).json({ error: 'Errore nel recupero dei links' });
    }
  };
  