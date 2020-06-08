import { IMessage } from './../../models/message.model';
import { Info } from './socket.events';

export const WelcomeMessage: IMessage = {
	type: Info,
	data: 'Welcome to the Chat Room'
};

export const UserJoinedMessage: IMessage = {
	type: Info,
	data: 'A User joined this Room'
};

export const UserLeftMessage: IMessage = {
	type: Info,
	data: 'A User has left the Room'
};
