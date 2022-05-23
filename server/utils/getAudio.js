import ytdl from 'ytdl-core';

export const getAudio = (videoURL, res, client) => {
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
		client.emit('videoDetails', [info.videoDetails.title, info.videoDetails.author.name]);
	});
};
