import { PrismaClient } from '@prisma/client';
import ytfps from 'ytfps';

const prisma = new PrismaClient();

export const addPlaylist = async (req, res, next) => {
	try {
		const playlistID = req.body.url.split('list=')[1];
		const playlistInfo = await ytfps(playlistID);

		let songs = [];
		playlistInfo.videos.forEach((song) => {
			songs.push({ title: song.title, url: song.url, length: song.length, thumbnail_url: song.thumbnail_url, author: song.author.name });
		});
		await prisma.playlist.create({
			data: {
				// @ts-ignore
				title: playlistInfo.title,
				url: playlistInfo.url,
				video_count: playlistInfo.video_count,
				view_count: playlistInfo.view_count,
				description: playlistInfo.description,
				author: playlistInfo.author.name,
				Songs: {
					create: songs,
				},
			},
		});
		res.status(200).send({ videos: playlistInfo.videos });
	} catch (error) {
		next(error);
	}
};

export const getPlaylist = async (req, res, next) => {
	try {
		const playlist = await prisma.playlist.findFirst({
			where: { id: parseInt(req.params.id) },
		});
		res.status(200).send({ message: playlist });
	} catch (error) {
		next(error);
	}
};

export const getPlaylists = async (req, res, next) => {
	try {
		const playlists = await prisma.playlist.findMany();
		res.status(200).send({ message: playlists });
	} catch (error) {
		next(error);
	}
};

export const deletePlaylist = async (req, res, next) => {
	try {
		await prisma.playlist.update({
			where: {
				id: parseInt(req.params.id),
			},
			data: {
				Songs: {
					deleteMany: {},
				},
			},
		});

		await prisma.playlist.delete({
			where: { id: parseInt(req.params.id) },
		});
		res.status(200).send({ message: `Deleted playlist with id: ${req.params.id}` });
	} catch (error) {
		next(error);
	}
};
