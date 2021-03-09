import { Document, Schema, model } from 'mongoose';

const userSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
		unique: true
	},
	email: {
		type: Schema.Types.String
	},
	password: {
		type: Schema.Types.String
	}
}, { timestamps: true }
);

export interface IUser {
	name: string;
	email?: string;
	password?: string;
}

export interface IUserDocument extends IUser, Document { }

export default model<IUserDocument>('User', userSchema);
