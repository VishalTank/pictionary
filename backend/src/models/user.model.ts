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
	},
	isAdmin: {
		type: Schema.Types.Boolean,
		default: false
	}
}, { timestamps: true }
);

export interface IUser extends Document {
	name: string;
	email?: string;
	password?: string;
	isAdmin: boolean;
}

export default model<IUser>('User', userSchema);
