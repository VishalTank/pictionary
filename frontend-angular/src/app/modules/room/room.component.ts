import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RoomService } from './room.service';
import { NameInputModalComponent } from './../../components/common/name-input-modal/name-input-modal/name-input-modal.component';
import { LocalStorageService } from './../../services/shared/localstorage.service';
import { USER } from './../../utilities/constants/localstorage.constants';
import { IUser } from './../../models/user';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

	room_id: string;
	members: IUser[];

	constructor(
		private route: ActivatedRoute,
		private roomService: RoomService,
		private modalService: NgbModal,
		private localStorageService: LocalStorageService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.room_id = params['id'];
			this.getRoomDetails(this.room_id);

			if (!this.localStorageService.get(USER))
				this.openNameInputModal();
		});
	}

	private getRoomDetails(room_id: string): void {
		this.roomService.getRoomDetails(room_id)
			.subscribe(roomData => {
				console.log('roomData:', roomData);
				this.members = roomData.members;
			});
	}

	private openNameInputModal(): void {
		const modelRef = this.modalService.open(NameInputModalComponent, { keyboard: false, backdrop: 'static' });
		modelRef.componentInstance.room_id = this.room_id;
	}
}
