import { Component, OnInit, OnChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';

import { RoomService } from './room.service';
import { NameInputModalComponent } from './../../components/common/name-input-modal/name-input-modal/name-input-modal.component';
import { USER } from './../../utilities/constants/localstorage.constants';
import { IRoom } from './../../models/room';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

	room_id: string;
	roomData: IRoom;
	showLoading: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private roomService: RoomService,
		private modalService: NgbModal,
		private storage: StorageMap,
		private ref: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.preventReload();
		this.showLoading = true;

		this.route.params.subscribe(params => {
			this.room_id = params['id'];
			this.getRoomDetails(this.room_id);

			// Open name form if localstorage does not contain username
			this.storage.get(USER).subscribe(userData => {
				if (!userData)
					this.openNameInputModal();
			});
		});
	}

	private getRoomDetails(room_id: string): void {
		this.roomService.getRoomDetails(room_id)
			.subscribe(roomData => {
				this.showLoading = false;
				this.roomData = roomData;
				this.ref.markForCheck();
			});
	}

	private openNameInputModal(): void {
		const modelRef = this.modalService.open(NameInputModalComponent, { keyboard: false, backdrop: 'static' });
		modelRef.componentInstance.room_id = this.room_id;
	}

	private preventReload(): void {
		window.addEventListener("beforeunload", function (e) {
			var confirmationMessage = "\o/";
			e.returnValue = confirmationMessage;
		});
	}
}
