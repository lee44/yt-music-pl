import express from 'express';
import { addPlaylist, deletePlaylist, getPlaylist, getPlaylists } from '../controllers/playlists.js';

const playlistRouter = express.Router();

playlistRouter.post('/', addPlaylist);
playlistRouter.get('/', getPlaylists);
playlistRouter.get('/:id', getPlaylist);
playlistRouter.delete('/:id', deletePlaylist);

export default playlistRouter;
