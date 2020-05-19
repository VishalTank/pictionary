import { Request, Response } from 'express';

import { Room, IRoom } from '../../models/room.model';
import { logger } from './../../services/app.logger';
import { generateRandomRoomId } from './room.utils';


export class RoomController {

	public createRoom(req: Request, res: Response) {
		console.log('REQBODY:', req.body);
		let room: Room = new Room();

		room.room_id = generateRandomRoomId(8);
		room.members = [];
		room.members.push(req.body.name);

		console.log(room);

		Object.assign(room, req.body);

		room.save()
			.then(savedData => {
				logger.info('Room Created successfully, room: ', savedData);
				res.status(200).json(room);
			})
			.catch(err => {
				logger.error('Error while creating room:', err);
				res.status(500).send(err);
			});
	}
}
