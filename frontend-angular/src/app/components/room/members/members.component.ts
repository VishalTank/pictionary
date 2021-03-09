import { Component, OnInit, Input } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { USER } from './../../../utilities/constants/localstorage.constants';

import { ChatService } from './../../../services/chat.service';
import { IRoom } from './../../../models/room';
import { IMember } from './../../../models/member';
import { IUser } from './../../../models/user';

@Component({
	selector: 'app-members',
	templateUrl: './members.component.html',
	styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

	@Input() roomData: IRoom;
	members: IMember[] = [];

	constructor(
		private chatService: ChatService,
		private storage: StorageMap
	) {
		this.storage.watch(USER).subscribe((userData: IUser) => {
			if (userData) {
				// this.chatService.connectToChatServer(userData, this.roomData.roomId)
				// 	.then(roomId => {

				// 		this.chatService.getMembers().subscribe((members: IMember[]) => {
				// 			this.members = members;
				// 		});
				// 	})
				// 	.catch(err => {
				// 		console.error('Error while connecting to Chat Server:', err);
				// 	});
			}
		}, err => {
			console.log(err);
		});
	}

	ngOnInit(): void {
		this.members = this.roomData.members;
	}

}
