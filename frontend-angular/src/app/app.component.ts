import { ChatService } from './chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	message = '';
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
