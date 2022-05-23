import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getSongs = async (req, res, next) => {
	try {
		const songs = await prisma.songs.findMany();
		console.log(songs);
		res.status(200).send({ message: songs });
	} catch (error) {
		next(error);
	}
};
