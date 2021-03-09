import { Request, Response } from 'express';

import Room, { IRoom } from '../../models/room.model';
import { logger } from './../../services/app.logger';
import { generateRandomRoomId } from './room.utils';
import User from './../../models/user.model';
import { RoomDbOps } from './room.db';
import { IMember } from './../../models/member.model';


export class RoomController {

	public createRoom(req: Request, res: Response): void {

		User.findOne({ name: req.body.name })
			.then(async existingUser => {
				let roomAdmin: IMember;

				if (!existingUser) {
					try {
						const savedUser = await new User(req.body).save();

						roomAdmin = {
							userInfo: savedUser,
							isAdmin: true
						};
					}
					catch (err) {
						logger.error('Error while creating user:' + err);
						res.status(500).send(err);
					}
				}
				else {
					roomAdmin = {
						userInfo: existingUser,
						isAdmin: true
					};
				}

				const roomBody: IRoom = {
					roomId: generateRandomRoomId(8),
					members: [roomAdmin]
				};

				new Room(roomBody).save()
					.then(savedRoom => {
						logger.info('Room created successfully: ' + savedRoom);
						res.status(200).json(savedRoom);
					})
					.catch(err => {
						logger.error('Error while creating room: ' + err);
						res.status(500).send(err);
					});
			})
			.catch(err => {
				logger.error('Error while finding a user from the database: ' + err);
				res.status(500).send(err);
			});
	}

	public getRoom(req: Request, res: Response): void {

		Room.findOne({ roomId: req.params.roomId })
			.populate({
				path: 'members',
				populate: {
					path: 'userInfo'
				}
			})
			.then(room => {
				if (room) {
					logger.info('Room fetched successfully: ' + room);
					res.status(200).send(room);
				}
				else {
					logger.error('Can not find room with given Id.');
					res.status(500).send({ error: 'Can not find room with given roomId.' });
				}
			})
			.catch(err => {
				logger.error('Error while fetching room: ' + err);
				res.status(500).send(err);
			});
	}

	public addUserToRoom(req: Request, res: Response): void {

		RoomDbOps.addUserToRoom(req.params.roomId, req.body)
			.then(updatedRoom => {
				logger.info('Updated members in the room successfully: ' + updatedRoom);
				res.status(200).send(updatedRoom);
			})
			.catch(err => {
				logger.error('Error while adding a user to room: ' + err);
				res.status(500).send(err);
			});
	}
}
