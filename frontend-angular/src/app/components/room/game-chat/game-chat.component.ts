import { Component, OnInit } from '@angular/core';

import { ChatService } from './../../../services/chat.service';

@Component({
	selector: 'app-game-chat',
	templateUrl: './game-chat.component.html',
	styleUrls: ['./game-chat.component.scss']
})
export class GameChatComponent implements OnInit {

	message: string = '';
	messages: string[] = [];

	constructor(private chatService: ChatService) { }

	ngOnInit(): void {
		this.chatService.getMessages().subscribe((message: string) => {
			console.log('MSG:', message);
			this.messages.push(message);
		})
	}

	sendMessage(): void {
		this.chatService.sendMessage(this.message);
		this.message = '';
	}
}
