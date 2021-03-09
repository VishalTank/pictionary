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

	roomId: string;
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
			this.roomId = params['id'];
			this.getRoomDetails(this.roomId);

			// Open name form if localstorage does not contain username
			this.storage.get(USER).subscribe(userData => {
				if (!userData)
					this.openNameInputModal();
			});
		});
	}

	private getRoomDetails(roomId: string): void {
		this.roomService.getRoomDetails(roomId)
			.subscribe(roomData => {
				this.showLoading = false;
				this.roomData = roomData;
				this.ref.markForCheck();
			});
	}

	private openNameInputModal(): void {
		const modelRef = this.modalService.open(NameInputModalComponent, { keyboard: false, backdrop: 'static' });
		modelRef.componentInstance.roomId = this.roomId;
	}

	private preventReload(): void {
		window.addEventListener("beforeunload", function (e) {
			var confirmationMessage = "\o/";
			e.returnValue = confirmationMessage;
		});
	}
}
