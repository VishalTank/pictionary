import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RoomService } from './room.service';
import { Room } from './../../../../../backend/src/models/room.model';
import { NameInputModalComponent } from './../../components/common/name-input-modal/name-input-modal/name-input-modal.component';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

	room_id: string;

	constructor(
		private route: ActivatedRoute,
		private roomService: RoomService,
		private modalService: NgbModal
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.room_id = params['id'];
			this.getRoomDetails(this.room_id);
			this.openNameInputModal();
		});
	}

	private getRoomDetails(room_id: string): void {
		this.roomService.getRoomDetails(room_id)
			.subscribe(roomData => {
				console.log('DATA:::::::', roomData);
			});
	}

	private openNameInputModal(): void {
		const modelRef = this.modalService.open(NameInputModalComponent);
		modelRef.componentInstance.room_id = this.room_id;
	}
}
