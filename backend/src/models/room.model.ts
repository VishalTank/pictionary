import { Document, Schema, model } from 'mongoose';

import { IUser } from './user.model';

const roomSchema = new Schema({
	room_id: {
		type: Schema.Types.String,
		required: true,
		unique: true
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	}]
});

export interface IRoom extends Document {
	room_id: string;
	members: IUser[];
}

export default model<IRoom>('Room', roomSchema);
