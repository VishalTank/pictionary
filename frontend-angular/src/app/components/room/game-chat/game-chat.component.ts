import { Component, OnInit, Input } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

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
		private storage: StorageMap
	) {
	}

	ngOnInit(): void {
		this.storage.watch(USER).subscribe(userData => {
			if (userData) {
				this.user = userData as IUser;

				this.chatService.connectToRoom(this.user, this.roomData.room_id);

				this.chatService.getMessages().subscribe((message: IMessage) => {
					this.messages.push(message);
				});
			}
		}, err => {
			console.log(err);
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
