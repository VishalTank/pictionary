import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RoomService } from './../../../../modules/room/room.service';
import { IUser } from './../../../../models/user';
import { LocalStorageService } from './../../../../services/shared/localstorage.service';
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
		private localStorageService: LocalStorageService
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
				this.localStorageService.set(USER, user);

				if (this.localStorageService.get(USER))
					this.activeModal.close(this.nameInputForm.value);
			});
	}
}
