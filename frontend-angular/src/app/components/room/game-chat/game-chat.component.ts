import { Component, OnInit } from '@angular/core';

import { ChatService } from './../../../services/chat.service';
import { IMessage } from '../../../models/message';

@Component({
	selector: 'app-game-chat',
	templateUrl: './game-chat.component.html',
	styleUrls: ['./game-chat.component.scss']
})
export class GameChatComponent implements OnInit {

	msg: string = '';
	messages: IMessage[] = [];

	constructor(private chatService: ChatService) { }

	ngOnInit(): void {

		this.chatService.connectToChatServer();

		this.chatService.getMessages().subscribe((message: IMessage) => {
			console.log('MSG:', message);
			this.messages.push(message);
		});
	}

	setChatMessage(): void {
		this.chatService.setChatMessage(this.msg);
		this.msg = '';
	}
}
