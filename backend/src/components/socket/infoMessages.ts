import { IMessage } from './../../models/message.model';
import { INFO } from './socket.events';

export const welcomeMessage = (userName: string): IMessage => {
	return {
		author: null,
		type: INFO,
		data: `Hey ${userName}, Welcome to the Chat Room!`
	};
};

export const userJoinedMessage = (userName: string): IMessage => {
	return {
		author: null,
		type: INFO,
		data: `${userName} just hopped in this room!`
	};
};

export const userLeftMessage = (userName: string): IMessage => {
	return {
		author: null,
		type: INFO,
		data: `${userName} just left this room :(`
	};
}
