import express from 'express';
import { getSongs } from '../controllers/songs.js';

const songRouter = express.Router();

songRouter.get('/', getSongs);

export default songRouter;
