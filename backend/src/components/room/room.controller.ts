import { Request, Response } from 'express';

import Room, { IRoom } from '../../models/room.model';
import { logger } from './../../services/app.logger';
import { generateRandomRoomId } from './room.utils';
import User, { IUser } from './../../models/user.model';


export class RoomController {

	public createRoom(req: Request, res: Response) {

		// Create Admin User before creating Room
		let adminUser: IUser = new User(req.body);

		adminUser.save()
			.then(savedUser => {
				// Now creating Room
				const roomBody = {
					room_id: generateRandomRoomId(8),
					members: [savedUser]
				};

				let room: IRoom = new Room(roomBody);

				room.save()
					.then(savedRoom => {
						logger.info('Room created successfully: ' + savedRoom);
						res.status(200).json(room);
					})
					.catch(err => {
						logger.error('Error while creating room: ' + err);
						res.status(500).send(err);
					});
			})
			.catch(err => {
				logger.error('Error while creating Admin User: ' + err);
				res.status(500).send(err);
			});
	}

	public getRoom(req: Request, res: Response) {

		Room.findOne({ room_id: req.params.room_id })
			.populate('members')
			.then(room => {
				logger.info('Room fetched successfully: ' + room);
				res.status(200).send(room);
			})
			.catch(err => {
				logger.error('Error while fetching room: ' + err);
				res.status(500).send(err);
			})
	}

	public async createUserAndAddToRoom(req: Request, res: Response) {

		const user: IUser = new User(req.body);

		user.save()
			.then(async savedUser => {

				const room_id: string = req.params.room_id;

				try {
					const updatedRoom: IRoom = await Room.findOneAndUpdate({ room_id }, { $push: { members: savedUser._id } }, { new: true });

					logger.info('Updated room successfully: ' + updatedRoom);
					res.status(200).send(updatedRoom);
				}
				catch (err) {
					logger.error('Error while adding a user to room: ' + err);
					res.status(500).send(err);
				}
			})
			.catch(err => {
				logger.error('Error while creating user to add to a room: ' + err);
				res.status(500).send(err);
			});
	}
}
