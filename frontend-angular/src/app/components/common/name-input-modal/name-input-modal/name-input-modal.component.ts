import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';

import { RoomService } from './../../../../modules/room/room.service';
import { IUser } from './../../../../models/user';
import { USER } from './../../../../utilities/constants/localstorage.constants';


@Component({
	selector: 'app-name-input-modal',
	templateUrl: './name-input-modal.component.html',
	styleUrls: ['./name-input-modal.component.scss']
})
export class NameInputModalComponent {

	@Input() room_id: string;
	showLoading: boolean = false;
	nameInputForm: FormGroup;

	constructor(
		private activeModal: NgbActiveModal,
		private roomService: RoomService,
		private storage: StorageMap
	) {
		this.createNameInputForm();
	}

	private createNameInputForm(): void {
		this.nameInputForm = new FormGroup({
			name: new FormControl('', [Validators.required])
		});
	}

	submitForm(): void {

		this.showLoading = true;
		const user: IUser = {
			name: this.nameInputForm.controls.name.value
		};

		this.roomService.createUserAndAddToRoom(this.room_id, user)
			.subscribe(() => {
				this.showLoading = false;

				this.storage.set(USER, user).subscribe(() => { });

				this.storage.get(USER).subscribe(userData => {
					this.activeModal.close(this.nameInputForm.value);
				}, err => {
					console.log(err);
				});
			});
	}
}
