import mongoose from 'mongoose';

import User, { IUser, IUserDocument } from './../../models/user.model';
import Room, { IRoom } from '../../models/room.model';
import { logger } from './../../services/app.logger';

export class RoomDbOps {

	public static addUserToRoom(roomId: string, user: IUser): Promise<IRoom> {
		let conditionalUpdate = null;
		let query = null;

		return new Promise(async (resolve, reject) => {
			try {
				const existingUser: IUserDocument = await User.findOne({ name: user.name });

				if (existingUser) {
					query = { roomId, 'members.userInfo': { $ne: existingUser._id } };
					conditionalUpdate = { $addToSet: { members: { userInfo: new mongoose.Types.ObjectId(existingUser._id) } } };

					logger.info('Found an existing user to be added to the room.');
				}
				else {
					const newUser: IUserDocument = await new User(user).save();
					query = { roomId, 'members.userInfo': { $ne: newUser._id } };
					conditionalUpdate = { $addToSet: { members: { userInfo: new mongoose.Types.ObjectId(newUser._id) } } };

					logger.info('A new user created to be added to the room.');
				}

				Room.findOneAndUpdate(query, conditionalUpdate, { new: true })
					.then(updatedRoom => {
						logger.info(`updatedRoom after adding a user to it: ${updatedRoom}`);
						resolve(updatedRoom);
					})
					.catch(err => {
						reject(err);
					});
			}
			catch (err) {
				logger.error('Error while adding a user to room', err);
				reject(err);
			}
		});
	}

	public static removeUserFromRoom(roomId: string, user: IUser): Promise<IRoom> {
		let conditionalUpdate = null;
		let query = null;

		return new Promise(async (resolve, reject) => {
			try {
				const existingUser: IUserDocument = await User.findOne({ name: user.name });

				if (existingUser) {
					query = { roomId, 'members.userInfo': { $eq: existingUser._id } };
					conditionalUpdate = { $pull: { members: { userInfo: existingUser } } };

					logger.info('Found the member to be removed from the room.');
				}
				else {
					conditionalUpdate = null;

					logger.error(`Can not find user with the name ${user.name} in the database.`);
					return reject(new Error(`Can not find user with the name ${user.name} in the database.`));
				}

				Room.findOneAndUpdate(query, conditionalUpdate, { new: true })
					.then(updatedRoom => {
						logger.info(`updatedRoom after removing a user from it: ${updatedRoom}`);
						resolve(updatedRoom);
					})
					.catch(err => {
						reject(err);
					});
			}
			catch (err) {
				logger.error('Error while removing a user from room', err);
				reject(err);
			}
		});

	}
}
