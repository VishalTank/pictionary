import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CopyService } from '../../../services/shared/copy.service';

@Component({
	selector: 'app-game-settings',
	templateUrl: './game-settings.component.html',
	styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {

	roomLink: string = '';
	copyButtonBorder: string = 'secondary';

	constructor(
		private copyService: CopyService
	) { }

	ngOnInit(): void {
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
