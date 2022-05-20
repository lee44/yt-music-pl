import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ytdl from 'ytdl-core';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;

var clientConn = null;

const getAudio = (videoURL, res) => {
	console.log(videoURL);
	var stream = ytdl(videoURL, {
		quality: 'highestaudio',
		filter: 'audioonly',
	})
		.on('progress', (chunkSize, downloadedChunk, totalChunk) => {
			// console.log(downloadedChunk);
			// clientConn.emit('progressEventSocket', [(downloadedChunk * 100) / totalChunk]);
			// clientConn.emit('downloadCompletedServer', [downloadedChunk]);
			if (downloadedChunk == totalChunk) {
				console.log('Downloaded');
			}
		})
		.pipe(res); //Push the audio file to the response

	ytdl.getInfo(videoURL).then((info) => {
		console.log('title:', info.videoDetails.title);
		console.log('rating:', info.player_response.videoDetails.averageRating);
		console.log('uploaded by:', info.videoDetails.author.name);
		clientConn.emit('videoDetails', [info.videoDetails.title, info.videoDetails.author.name]);
	});
};

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cors());

//root handler that sends the parameters to getAudio function
app.post('/', (req, res) => {
	getAudio(req.body.url, res);
});

//socket.io connection
io.on('connection', (client) => {
	clientConn = client;
	console.log('User connected');
});

server.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
