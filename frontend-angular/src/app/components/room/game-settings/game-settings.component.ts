import { Component, Input, OnInit } from '@angular/core';

import { CopyService } from '../../../services/shared/copy.service';
import { UI } from './../../../utilities/constants/ui.constants';

@Component({
	selector: 'app-game-settings',
	templateUrl: './game-settings.component.html',
	styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {

	@Input() room_id: string;
	roomLink: string = null;
	copyButtonBorder: string = 'secondary';

	constructor(
		private copyService: CopyService
	) { }

	ngOnInit(): void {
		this.roomLink = UI.ROOM + this.room_id;
	}

	copyToClipboard(inputElement): void {
		this.copyService.copyToClipboard(inputElement, this.roomLink)
			.then(() => {
				console.log('Copied to clipboard');
				this.copyButtonBorder = 'success'
			})
			.catch(err => {
				console.log(err);
				this.copyButtonBorder = 'danger';
			})
	}
}
