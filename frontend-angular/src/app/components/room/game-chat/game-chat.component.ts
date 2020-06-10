import { LocalStorageService } from './../../../services/shared/localstorage.service';
import { Component, OnInit, Input } from '@angular/core';

import { ChatService } from './../../../services/chat.service';
import { IMessage } from '../../../models/message';
import { Info } from './../../../utilities/constants/socket.events';
import { IRoom } from './../../../models/room';
import { USER } from 'src/app/utilities/constants/localstorage.constants';
import { IUser } from './../../../models/user';

@Component({
	selector: 'app-game-chat',
	templateUrl: './game-chat.component.html',
	styleUrls: ['./game-chat.component.scss']
})
export class GameChatComponent implements OnInit {

	@Input() roomData: IRoom;
	msg: string = '';
	messages: IMessage[] = [];
	Info: string = Info;
	user: IUser;

	constructor(
		private chatService: ChatService,
		private localstorageService: LocalStorageService
	) {
		this.user = this.localstorageService.get(USER);
	}

	ngOnInit(): void {
		this.chatService.connectToRoom(this.user, this.roomData.room_id);

		this.chatService.getMessages().subscribe((message: IMessage) => {
			this.messages.push(message);
		});
	}

	sendChatMessage(): void {
		const chatMessage: IMessage = {
			author: this.user,
			data: this.msg
		};

		this.chatService.sendChatMessage(chatMessage);
		this.msg = '';
	}
}
