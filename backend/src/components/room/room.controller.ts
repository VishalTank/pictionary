import { Request, Response } from 'express';

import { Room } from '../../models/room.model';
import { logger } from './../../services/app.logger';
import { generateRandomRoomId } from './room.utils';
import { User } from './../../models/user.model';


export class RoomController {

	public createRoom(req: Request, res: Response) {

		// Create Admin User before creating Room
		let adminUser: User = new User();
		Object.assign(adminUser, req.body);

		adminUser.save()
			.then((user) => {

				// Now creating Room
				let room: Room = new Room();
				room.room_id = generateRandomRoomId(8);
				room.members = [];
				room.members.push(adminUser);

				room.save()
					.then((savedData) => {
						logger.info('Room Created successfully.');
						res.status(200).json(room);
					})
					.catch(err => {
						logger.error('Error while creating room:', err);
						res.status(500).send(err);
					});
			})
			.catch(err => {
				logger.error('Error while creating Admin User:', err);
				res.status(500).send(err);
			});
	}

	public getRoom(req: Request, res: Response) {

		const room_id: string = req.params.room_id;
		const query = {
			where: {
				room_id
			}
		};

		Room.find(query)
			.then((savedData) => {
				console.log('SAVED ROOM::::::::::', savedData[0].members);
				res.send(savedData);
			})
			.catch(err => {
				logger.error(err);
				res.send(err);
			})
	}
}
