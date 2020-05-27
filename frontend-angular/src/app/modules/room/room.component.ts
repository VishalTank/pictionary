import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoomService } from './room.service';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

	room_id: string;

	constructor(
		private route: ActivatedRoute,
		private roomService: RoomService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.room_id = params['id'];
			this.getRoomDetails(this.room_id);
		});

	}

	private getRoomDetails(room_id: string): void {
		this.roomService.getRoomDetails(room_id)
			.subscribe(roomData => {
				console.log('DATA:::::::', roomData);
			});
	}
}
