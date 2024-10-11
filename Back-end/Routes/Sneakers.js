import express from 'express';
import { getSneakers, postSneaker, getSneakerById, updateSneaker, deleteSneaker } from '../Controllers/Sneakers.js';
const router = express.Router();

router.get('/', getSneakers);
router.get('/:id', getSneakerById)
router.post('/', postSneaker);
router.patch('/:id', updateSneaker);
router.delete('/:id', deleteSneaker)

export default router;