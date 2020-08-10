import { Document, Schema, model } from 'mongoose';

import { IMember } from './member.model';

const roomSchema = new Schema({
	roomId: {
		type: Schema.Types.String,
		required: true,
		unique: true
	},
	members: [{
		userInfo: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			unique: true
		},
		isAdmin: {
			type: Schema.Types.Boolean,
			default: false
		}
	}]
});

export interface IRoom {
	roomId: string;
	members: IMember[];
}

export interface IRoomDocument extends IRoom, Document { }

export default model<IRoomDocument>('Room', roomSchema);
