import { Request, Response } from 'express';

import { Room, IRoom } from '../../models/room.model';
import { logger } from './../../services/app.logger';
import { generateRandomRoomId } from './room.utils';


export class RoomController {

	public createRoom(req: Request, res: Response) {
		console.log('REQBODY:', req.body);
		let room: Room = new Room();

		req.body['room_id'] = generateRandomRoomId(8);
		req.body['members'] = [];
		req.body.members.push(req.body.name);

		Object.assign(room, req.body as Room)

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
