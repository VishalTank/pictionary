import { Component, OnInit, Input } from '@angular/core';

import { ChatService } from './../../../services/chat.service';
import { IRoom } from './../../../models/room';
import { IUser } from './../../../models/user';

@Component({
	selector: 'app-members',
	templateUrl: './members.component.html',
	styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

	@Input() roomData: IRoom;
	members: IUser[] = [];

	constructor(private chatService: ChatService) { }

	ngOnInit(): void {
		this.members = this.roomData.members;

		this.chatService.getMembers()
			.subscribe(members => {
				console.log('members:', members);
				this.members = members;
			})
	}

}
