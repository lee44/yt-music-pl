import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import playlistRouter from './routes/playlistRouter.js';
import songRouter from './routes/songsRouter.js';
import { getAudio } from './utils/getAudio.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;

var client = null;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cors());

//root handler that sends the parameters to getAudio function
app.post('/', (req, res) => {
	getAudio(req.body.url, res, client);
});

app.use('/playlists', playlistRouter);
app.use('/songs', songRouter);

//socket.io connection
io.on('connection', (client) => {
	client = client;
	console.log('User connected');
});

server.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
